import InformacionUser from "../modelos/informacionUser.js";
import User from "../modelos/user.js";
import CodigoModel from "../modelos/codigo.js"; // Asegúrate de importar tu modelo de Código

export const crearUsuario = async (req, res) => {
    console.log("\nFuncion CrearUsuario()");
    try {
        const { nombre, fechaNacimiento, cedula, ciudad, email, contrasena, rol } = req.body;

        // Crear el nuevo usuario
        const newUser = new User({
            email: email,
            contrasena: contrasena,
            rol: rol ? rol : 'cliente',
        });
        await newUser.save();
        console.log("Usuario Guardado", newUser);

        // Crear la información del usuario
        const newUserInfo = new InformacionUser({
            user: newUser._id,
            nombre: nombre,
            fechaNacimiento: fechaNacimiento,
            cedula: cedula,
            ciudad: ciudad,
        });
        await newUserInfo.save();
        console.log("Informacion de usuario guardada", newUserInfo);

        // Responder con el ID del usuario y su información
        return res.status(201).json({
            mensaje: "Usuario guardado con éxito",
            userId: newUser._id, // ID del usuario
            userInfoId: newUserInfo._id // ID de la información del usuario
        });
    } catch (error) {
        console.log("Error en crearUsuario()", error);
        return res.status(500).json({ mensaje: "Error en el servidor" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, contrasena } = req.body;
        const user = await User.findOne({ email, contrasena });

        // Verifica si el usuario existe
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' });
        }

        // Si el usuario existe, busca su información adicional
        const infoUser = await InformacionUser.findOne({ user: user._id });

        // Devuelve las credenciales correctas junto con el rol
        return res.status(200).json({
            message: 'Credenciales correctas',
            userId: infoUser._id,
            rol: user.rol, // Devuelve el rol del usuario
        });
    } catch (error) {
        console.log("Error en login()", error);
        return res.status(500).json({ message: "Error en el servidor" });
    }
};

