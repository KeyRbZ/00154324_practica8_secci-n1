import jwt from 'jsonwebtoken';

// Usuario MOCK 
const users = [
    {
        id: 1,
        email: 'jerry@example.com',
        password: 'admin123'
    }
];

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    console.log('Intentando login para:', email);

    try {
        const user = users.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        console.log('Usuario encontrado:', user.email);

        if (user.password === password) {
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                'tu_secreto_jwt',
                { expiresIn: '24h' }
            );

            return res.json({
                message: 'Login exitoso',
                token,
            });
        }

        res.status(401).json({ error: 'Credenciales inválidas' });

    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};