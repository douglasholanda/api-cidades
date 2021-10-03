const api = require("../services/externalAPI");

class CityController {
    static async getAllCities(req, res) {
        const query = req.query;
        const uf = req.query.uf;
        let name = req.query.name;
        let region = req.query.region;
        let state = req.query.state;

        //SEARCHING WITH NO PARAMS
        if (!uf && !name && !region && !state) {
            try {
                const { data } = await api;

                const cityOk = data.map((city) => {
                    return {
                        id: city.id,
                        name: city.nome,
                        state: city.microrregiao.mesorregiao.UF.nome,
                        uf: city.microrregiao.mesorregiao.UF.sigla,
                        region: city.microrregiao.mesorregiao.UF.regiao.nome,
                    };
                });
                return res.status(200).json(cityOk);
            } catch (error) {
                return res.status(404).json({
                    message: error.message,
                });
            }
        }

        //SEARCHING BY UF
        if (uf && !name && !region && !state) {
            if (uf === uf.toLowerCase() && uf.length === 2) {
                return res.status(400).json({
                    message: "invalid uf field, its value must be upper case",
                });
            }
            if (uf.length < 2 || uf.length > 2) {
                return res.status(400).json({
                    message: "the uf field must have only two letters",
                });
            }
            if (uf === uf.toUpperCase()) {
                try {
                    const { data } = await api;

                    const cityOk = data
                        .filter(
                            (city) =>
                                city.microrregiao.mesorregiao.UF.sigla === uf
                        )
                        .map((city) => {
                            return {
                                id: city.id,
                                name: city.nome,
                                state: city.microrregiao.mesorregiao.UF.nome,
                                uf: city.microrregiao.mesorregiao.UF.sigla,
                                region: city.microrregiao.mesorregiao.UF.regiao
                                    .nome,
                            };
                        });

                    return res.status(200).json(cityOk);
                } catch (error) {
                    return res.status(404).json({
                        message: "no city was found with the given parameters",
                    });
                }
            }
        }

        //SEARCHING BY NAME
        if (name && !uf && !region && !state) {
            let re = /(\b[a-z](?!\s))/g;
            name = name.toLowerCase();
            name = name.replace(re, (x) => {
                return x.toUpperCase();
            });

            try {
                const { data } = await api;

                const cityOk = data
                    .filter((city) => city.nome.includes(name))
                    .map((city) => {
                        return {
                            id: city.id,
                            name: city.nome,
                            state: city.microrregiao.mesorregiao.UF.nome,
                            uf: city.microrregiao.mesorregiao.UF.sigla,
                            region: city.microrregiao.mesorregiao.UF.regiao
                                .nome,
                        };
                    });

                if (cityOk.length === 0) {
                    return res.status(404).json({
                        message: "no city was found with the given parameters",
                    });
                }

                return res.status(200).json(cityOk);
            } catch (error) {
                return res.status(404).json({
                    message: "no city was found with the given parameters",
                });
            }
        }

        //SEARCHING BY REGION
        if (region && !uf && !name && !state) {
            let re = /(\b[a-z](?!\s))/g;
            region = region.toLowerCase();
            region = region.replace(re, (x) => {
                return x.toUpperCase();
            });

            try {
                const { data } = await api;

                const cityOk = data
                    .filter((city) =>
                        city.microrregiao.mesorregiao.UF.regiao.nome.includes(
                            region
                        )
                    )
                    .map((city) => {
                        return {
                            id: city.id,
                            name: city.nome,
                            state: city.microrregiao.mesorregiao.UF.nome,
                            uf: city.microrregiao.mesorregiao.UF.sigla,
                            region: city.microrregiao.mesorregiao.UF.regiao
                                .nome,
                        };
                    });

                if (cityOk.length === 0) {
                    return res.status(404).json({
                        message: "no city was found with the given parameters",
                    });
                }

                return res.status(200).json(cityOk);
            } catch (error) {
                return res.status(404).json({
                    message: "no city was found with the given parameters",
                });
            }
        }

        //SEARCHING BY STATE
        if (state && !region && !uf && !name) {
            let re = /(\b[a-z](?!\s))/g;
            //state = state.toLowerCase();
            state = state.replace(re, (x) => {
                return x.toUpperCase();
            });

            try {
                const { data } = await api;

                const cityOk = data
                    .filter((city) =>
                        city.microrregiao.mesorregiao.UF.nome.includes(state)
                    )
                    .map((city) => {
                        return {
                            id: city.id,
                            name: city.nome,
                            state: city.microrregiao.mesorregiao.UF.nome,
                            uf: city.microrregiao.mesorregiao.UF.sigla,
                            region: city.microrregiao.mesorregiao.UF.regiao
                                .nome,
                        };
                    });

                if (cityOk.length === 0) {
                    return res.status(404).json({
                        message: `no city was found with the given parameters ${state}`,
                    });
                }

                return res.status(200).json(cityOk);
            } catch (error) {
                return res.status(404).json({
                    message: `no city was found with the given parameters ${state}`,
                });
            }
        }

        //SEARCHING BY REGION, UF, NAME
        if (uf && region && name && !state) {
            if (uf === uf.toLowerCase() && uf.length === 2) {
                return res.status(400).json({
                    message: "invalid uf field, its value must be upper case",
                });
            }
            if (uf.length < 2 || uf.length > 2) {
                return res.status(400).json({
                    message: "the uf field must have only two letters",
                });
            }
            let re = /(\b[a-z](?!\s))/g;
            region = region.toLowerCase();
            region = region.replace(re, (x) => {
                return x.toUpperCase();
            });
            name = name.toLowerCase();
            name = name.replace(re, (x) => {
                return x.toUpperCase();
            });

            try {
                const { data } = await api;

                const cityOk = data
                    .filter((city) =>
                        city.microrregiao.mesorregiao.UF.regiao.nome.includes(
                            region
                        )
                    )
                    .filter((city) =>
                        city.microrregiao.mesorregiao.UF.sigla.includes(uf)
                    )
                    .filter((city) => city.nome.includes(name))
                    .map((city) => {
                        return {
                            id: city.id,
                            name: city.nome,
                            state: city.microrregiao.mesorregiao.UF.nome,
                            uf: city.microrregiao.mesorregiao.UF.sigla,
                            region: city.microrregiao.mesorregiao.UF.regiao
                                .nome,
                        };
                    });

                if (cityOk.length === 0) {
                    return res.status(404).json({
                        message: "no city was found with the given parameters",
                    });
                }

                return res.status(200).json(cityOk);
            } catch (error) {
                return res.status(404).json({
                    message: "no city was found with the given parameters",
                });
            }
        }
    }
}

module.exports = CityController;
