import mysql from 'mysql';
import { getCompanies } from './api';
import { Company } from './interface';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err
    try {
        let totalResults = 0;
        createDatabase();
        getCompanies(1).then((res: any) => {
            totalResults = res.data.total_results
            InsertOrUpdateData(totalResults, 0);
        })
    } catch (err) {
        console.log(err)
    }
});

export const getCompaniesByName = (name: string, perPage: number, offset: number) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM company WHERE name LIKE CONCAT("%", ?, "%") LIMIT ? OFFSET ?', [name, perPage, offset], function(err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

export const getTotalCompanies = (name : string) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) as total FROM company WHERE name LIKE CONCAT("%", ?, "%")', [name], function(err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

export const getCompanyById = (id : string) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT a.*, c.* FROM address as a INNER JOIN company as c on a.company_id = c.id WHERE a.company_id = ?', [id], function(err, result) {
            if (err) reject(err)
            resolve(result)
        })
    })
}

const createDatabase = () => {
    try {
        db.query('DROP DATABASE kabolt')
        db.query('CREATE DATABASE kabolt')
        db.query('USE kabolt')
        db.query('CREATE TABLE company (id INT PRIMARY KEY, name VARCHAR(255), isOrganismeFormation BOOLEAN, isOrganismeSante BOOLEAN, isServicePublic BOOLEAN, isEnseignement BOOLEAN, idAssociation VARCHAR(255), isSpectacle BOOLEAN, creationDate VARCHAR(255))')
        db.query('CREATE TABLE address (id INT PRIMARY KEY AUTO_INCREMENT, company_id INT, address VARCHAR(255), latitude VARCHAR(255), longitude VARCHAR(255), FOREIGN KEY (company_id) REFERENCES company(id))')
    } catch (err) {
        console.log(err)
    }
}

const InsertOrUpdateData = (totalResults: number, resultsAlreadyInDb : number) => {
    const nbResultsToFetch = totalResults - (totalResults - resultsAlreadyInDb);
    const pageNumberToFetch = (nbResultsToFetch / 25) + 1;
    if(resultsAlreadyInDb < totalResults) {
        getCompanies(pageNumberToFetch).then((res : any ) => {
            const resultPerPage = 25;
            const companyPromises = res.data.results.map((company : Company) => {
                return new Promise<void>((resolve, reject) => {
                    db.query('SELECT * FROM company WHERE id = ?', [company.siren], function(err, result) {
                        if (err) reject(err)
                        if (result.length === 0) {
                            db.query('INSERT INTO company (id, name, isOrganismeFormation, isOrganismeSante, isServicePublic, isEnseignement, idAssociation, isSpectacle, creationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [company.siren, company.nom_complet, company.complements.est_organisme_formation, company.complements.est_finess, company.complements.est_service_public, company.complements.est_uai, company.complements.identifiant_association, company.complements.est_entrepreneur_spectacle, company.date_creation], function(err) {
                                if (err) reject(err)
                                return
                            });
                            company.matching_etablissements.forEach((etablissement : any) => {
                                db.query('INSERT INTO address (company_id, address, latitude, longitude) VALUES (?, ?, ?, ?)', [company.siren, etablissement.adresse, etablissement.latitude, etablissement.longitude ], function(err) {
                                    if (err) reject(err)
                                    resolve()
                                });
                            })                
                        } else {
                            db.query('UPDATE company SET name = ? WHERE id = ?', [company.nom_complet, company.siren], function(err) {
                                if (err) reject(err)
                                resolve()
                            });
                        }
                    })
                });
            });
            
            Promise.all(companyPromises).then(() => {
                resultsAlreadyInDb  += resultPerPage;
                InsertOrUpdateData(totalResults, resultsAlreadyInDb);
            }).catch((err) => console.log(err));
        })
    } else {
        console.log("terminé")
    }
}
