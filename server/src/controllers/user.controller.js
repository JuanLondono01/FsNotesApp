const User = require('../models/UserSchema');
const userCtrl = {};

// Obtener usuario
userCtrl.getUser = async (req, res) => {
    try {
        const userFound = await User.findById(req.userId).select('-password');

        if (!userFound) {
            return res.status(404).send('No user found');
        }

        res.status(200).json(userFound);
    } catch (error) {
        res.status(500).json({
            message: 'Failed to authenticate token.',
            error,
        });
    }
};

// Obtener notas del usuario
userCtrl.getNotes = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.json(user.userNotes);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las notas', error });
    }
};

//Crear una nueva nota
userCtrl.createNote = async (req, res) => {
    try {
        const { title, body, isImportant } = req.body;

        const user = await User.findById(req.userId);

        const newNote = {
            title,
            body,
            isImportant,
        };

        if (isImportant) {
            user.userNotes.unshift(newNote)
        }else{
            user.userNotes.push(newNote);
        }

        await user.save();

        res.status(201).json({
            message: 'Nota creada con éxito',
            note: newNote,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la nota', error });
    }
};

// Editar una nota del usuario
userCtrl.editNote = async (req, res) => {
    try {
        const { title, body, isImportant } = req.body;
        const noteId = req.params.id;

        const user = await User.findById(req.userId);

        const note = user.userNotes.id(noteId);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Actualiza los campos de la nota
        if (title) note.title = title;
        if (body) note.body = body;
        if (typeof isImportant !== 'undefined') note.isImportant = isImportant;

        await user.save();

        res.status(200).json({ message: 'Nota editada exitosamente', note });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la nota', error });
    }
};

// Eliminar una nota del usuario
userCtrl.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.id;

        const user = await User.findById(req.userId);

        const noteFound = user.userNotes.id(noteId);

        if (!noteFound) {
            return res.status(404).json({ message: 'Note not found' });
        }

        noteFound.deleteOne(noteFound)

        await user.save()
        res.json({ message: 'Nota eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la nota', error });
    }
};

// Editar configuraciones del usuario
userCtrl.editSettings = async (req, res) => {
    try {
        // Aquí iría la lógica para editar las configuraciones del usuario en la base de datos
        res.json({
            message: 'Configuraciones de usuario editadas exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al editar las configuraciones de usuario',
            error,
        });
    }
};

// Eliminar cuenta
userCtrl.deleteAccount = async (req, res) => {
    try {
        const userId = req.params.id;
        
        // Verifica que el usuario está autenticado y el ID del usuario coincide con el ID en el token
        if (req.userId !== userId) {
            return res.status(403).json({ message: 'No autorizado para eliminar esta cuenta' });
        }

        const result = await User.findByIdAndDelete(userId);

        if (!result) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).send('Usuario eliminado exitosamente');
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar la cuenta de usuario',
            error,
        });
    }
};

module.exports = userCtrl;
