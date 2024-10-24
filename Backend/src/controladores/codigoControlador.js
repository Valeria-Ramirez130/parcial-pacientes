import Codigo from "../modelos/codigo.js"; // Importa el modelo de código

// Función para generar códigos aleatorios
const generarCodigos = async () => {
    const codigos = [];
    const premios = [
        { premio: 1000000, cantidad: 100 },
        { premio: 500000, cantidad: 100 },
        { premio: 200000, cantidad: 100 },
    ];

    // Generar códigos numéricos de 3 dígitos
    for (const { premio, cantidad } of premios) {
        for (let i = 0; i < cantidad; i++) {
            let codigo;
            // Genera un nuevo código único
            do {
                codigo = Math.floor(100 + Math.random() * 900).toString();
            } while (await Codigo.exists({ codigo })); // Verifica que no exista

            codigos.push({ codigo, premio, estado: 'libre' }); // Estado por defecto es 'libre'
        }
    }

    // Insertar los códigos en la base de datos
    await Codigo.insertMany(codigos);
};

// Crear un nuevo código (esto será usado para iniciar la generación)
export const crearCodigo = async (req, res) => {
    console.log('req:', req); // Depuración
    console.log('res:', res); // Depuración
    try {
        // Verifica si ya existen códigos en la base de datos
        const count = await Codigo.countDocuments();
        if (count === 0) {
            await generarCodigos(); // Solo generar si no hay códigos
            return res.status(201).json({ message: "Códigos generados correctamente" });
        }
        return res.status(200).json({ message: "Los códigos ya han sido generados." });
    } catch (error) {
        console.log("Error en crearCodigo()", error);
        return res.status(500).json({ message: "Error al crear los códigos" });
    }
};

// Listar códigos
export const listarCodigos = async (req, res) => {
    try {
        const codigos = await Codigo.find();
        return res.status(200).json(codigos);
    } catch (error) {
        console.log("Error en listarCodigos()", error);
        return res.status(500).json({ message: "Error al listar los códigos" });
    }
};

// Verificar un código
export const verificarCodigo = async (req, res) => {
    try {
        const { codigo } = req.body;
        const codigoEncontrado = await Codigo.findOne({ codigo });

        if (!codigoEncontrado) {
            return res.status(404).json({ message: "Código no encontrado" });
        }

        // Verificar si el código ya ha sido registrado
        if (codigoEncontrado.estado === 'registrado') {
            return res.status(400).json({ message: "Este código ya ha sido registrado." });
        }

        // Actualizar el estado a 'registrado'
        codigoEncontrado.estado = 'registrado';
        await codigoEncontrado.save();

        return res.status(200).json({ message: `¡Has ganado ${codigoEncontrado.premio} pesos!` });
    } catch (error) {
        console.log("Error en verificarCodigo()", error);
        return res.status(500).json({ message: "Error al verificar el código" });
    }
};
