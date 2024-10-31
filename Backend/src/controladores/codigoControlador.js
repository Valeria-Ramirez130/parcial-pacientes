import CodigoModel from '../modelos/codigo.js';

// Función para crear los 1000 códigos
export const createCodes = async (req, res) => {
    try {
        const { total = 1000, totalPremios = 400 } = req.body;

        // Validaciones básicas
        if (totalPremios > total) {
            return res.status(400).json({ error: "El número de premios no puede ser mayor al total de códigos." });
        }

        const premios = [
            { premio: 1000000, cantidad: 50 },
            { premio: 50000, cantidad: 150 },
            { premio: 10000, cantidad: 200 },
        ];

        const premiosArray = [];
        for (const { premio, cantidad } of premios) {
            for (let i = 0; i < cantidad; i++) {
                premiosArray.push(premio);
            }
        }

        // Barajar el arreglo de premios
        for (let i = premiosArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [premiosArray[i], premiosArray[j]] = [premiosArray[j], premiosArray[i]];
        }

        const codigos = [];

        // Generar los códigos
        for (let i = 1; i <= total; i++) {
            codigos.push({
                Codigo: i.toString().padStart(4, "0"),
                TienePremio: false,
                Premio: null,
                Estado: 'disponible', // Asegúrate de agregar el estado disponible
            });
        }

        // Asignar premios aleatoriamente
        for (let i = 0; i < totalPremios; i++) {
            let codigoAleatorio = Math.floor(Math.random() * total);
            while (codigos[codigoAleatorio].TienePremio) {
                codigoAleatorio = Math.floor(Math.random() * total);
            }

            codigos[codigoAleatorio].TienePremio = true;
            codigos[codigoAleatorio].Premio = `Premio de ${premiosArray[i]}`;
        }

        // Insertar los códigos en la base de datos
        await CodigoModel.insertMany(codigos);

        res.status(201).json({ message: "Códigos generados exitosamente", totalCodigos: total });
    } catch (error) {
        console.error("Error al crear los códigos:", error);
        res.status(500).json({ error: "Error del servidor al crear los códigos" });
    }
};

// Función para verificar el código ingresado por el usuario
export const verificarCodigo = async (req, res) => {
    try {
        const { codigo, userId } = req.body;

        // Verifica que se reciban ambos valores
        if (!codigo || !userId) {
            return res.status(400).json({ error: "Código o ID de usuario no proporcionados." });
        }

        const codigoEncontrado = await CodigoModel.findOne({ Codigo: codigo });

        if (!codigoEncontrado) {
            return res.status(404).json({ error: "Código no existe." });
        }

        if (codigoEncontrado.Estado === 'usado') {
            return res.status(400).json({ error: "Código ya registrado." });
        }

        // Actualiza el estado y asigna el usuario
        codigoEncontrado.Estado = 'usado';
        codigoEncontrado.FechaUso = new Date();
        codigoEncontrado.User = userId; // Asignar el ID del usuario al campo User

        await codigoEncontrado.save();

        if (codigoEncontrado.TienePremio) {
            return res.status(200).json({ message: `¡Te ganaste un ${codigoEncontrado.Premio}!` });
        }

        return res.status(200).json({ message: "No ganaste." });
    } catch (error) {
        console.error("Error al verificar el código:", error);
        res.status(500).json({ error: "Error del servidor al verificar el código." });
    }
};

// Función para obtener códigos del usuario
export const obtenerCodigosUsuario = async (req, res) => {
    try {
        const { userId } = req.params;

        const codigosUsuario = await CodigoModel.find({ User: userId, Estado: 'usado' });

        return res.status(200).json(codigosUsuario);
    } catch (error) {
        console.error("Error al obtener códigos del usuario:", error);
        res.status(500).json({ error: "Error del servidor al obtener los códigos del usuario" });
    }
};
