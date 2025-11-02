import bcrypt from 'bcryptjs';

// BASE DE DATOS MOCK 
const mockUsers = [
    { id: 1, name: "Jerry", email: "jerry@example.com", password: "6789kdjn" },
    { id: 2, name: "Juana Menjivar", email: "juana.menjivar@uca.edu.sv", password: "Hola90i88" },
    { id: 3, name: "Carlos Rodríguez", email: "carlos.rodriguez@uca.edu.sv", password: "jsdibsijM0" },
    { id: 4, name: "Ana Martínez", email: "ana.martinez@uca.edu.sv", password: "Ljnlm89pnf" },
    { id: 5, name: "Luis Hernández", email: "luis.hernandez@uca.edu.sv", password: "dmodjijmkl" },
    { id: 6, name: "Sofia López", email: "sofia.lopez@uca.edu.sv", password: "passwordklmno" },
    { id: 7, name: "Diego Pérez", email: "diego.perez@uca.edu.sv", password: "passwordpqrst" },
    { id: 8, name: "Elena Ramírez", email: "elena.ramirez@uca.edu.sv", password: "passworduvwxy" },
    { id: 9, name: "Javier Torres", email: "javier.torres@uca.edu.sv", password: "passwordzabcd" },
    { id: 10, name: "Camila Reyes", email: "camila.reyes@uca.edu.sv", password: "passwordefghi" }
];

// GET Todos los usuarios 
export const getUsers = async (req, res) => {
    try {
        console.log('Listando todos los usuarios');
        res.json(mockUsers);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: error.message });
    }
};

// GET Usuario por ID 
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Buscando usuario con ID: ${id}`);

        const user = mockUsers.find(u => u.id === parseInt(id));

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log('Usuario encontrado:', user.email);
        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// POST Crear usuario 
export const createUser = async (req, res) => {
    try {
        const { id, name, email, password } = req.body;

        console.log('Creando usuario:', { id, name, email });
        console.log('Password original:', password);

        // Verificar si el ID ya existe
        if (id) {
            const existingId = mockUsers.find(u => u.id === parseInt(id));
            if (existingId) {
                return res.status(400).json({ error: 'El ID ya está en uso' });
            }
        }

        // Verificar si el email ya existe
        const existingEmail = mockUsers.find(u => u.email === email);
        if (existingEmail) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hasheada:', hashedPassword);

        // Usar el ID proporcionado o generar uno automático
        const newId = id ? parseInt(id) : (mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1);

        const newUser = {
            id: newId,
            name: name,
            email: email,
            password: hashedPassword
        };

        // Agregar a la lista MOCK
        mockUsers.push(newUser);

        console.log('Usuario creado exitosamente con ID:', newId);
        res.status(201).json(newUser);

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// PUT Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        console.log(`Actualizando usuario ID: ${id}`, { name, email });

        const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Verificar si el nuevo email ya existe en otro usuario
        const emailExists = mockUsers.some(u => u.email === email && u.id !== parseInt(id));
        if (emailExists) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }

        // Actualizar usuario 
        mockUsers[userIndex] = {
            ...mockUsers[userIndex],
            name: name,
            email: email
        };

        console.log('Usuario actualizado exitosamente');
        res.json(mockUsers[userIndex]);

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: error.message });
    }
};

// DELETE Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Eliminando usuario ID: ${id}`);

        const userIndex = mockUsers.findIndex(u => u.id === parseInt(id));

        if (userIndex === -1) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Eliminar usuario
        const deletedUser = mockUsers.splice(userIndex, 1)[0];

        console.log('Usuario eliminado:', deletedUser.email);
        res.json({
            message: `Usuario ${deletedUser.name} eliminado exitosamente`,
            deletedUser: deletedUser
        });
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: error.message });
    }
};