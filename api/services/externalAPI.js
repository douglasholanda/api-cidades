const axios = require("axios");

const api = axios.get(
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
);

module.exports = api;
