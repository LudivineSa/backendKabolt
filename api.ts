import axios from 'axios';

export const getCompanies = (pageNumber: number) => {
    return axios.get(`https://recherche-entreprises.api.gouv.fr/search?code_postal=69001&page=${pageNumber}&per_page=25`);
}