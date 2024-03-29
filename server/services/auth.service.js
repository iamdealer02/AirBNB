const pool = require('../boot/database/db_connect');
const statusCode = require('../constants/statusCode');
const logger = require('../middleware/winston');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    //check
    const { email , password } = req.body;
    // check if email is valid 
    
    if (!email || !password){
        return res.status(statusCode.missingParameters)
        .json({message: 'Missing required fields'})
    } else{
        const client = await pool.connect();
        try{
            const result = await client.query(" SELECT * from users where email = $1 ", [email]);
            console.log(result);
            // if any result exists that means a user already exists
            if (result.rowCount){
                return res.status(statusCode.userAlreadyExists) 
                .json({message : "User already exists"})
            }
            else{
                const addUser = await client.query(`INSERT INTO users (email, password) VALUES ($1, crypt($2, gen_salt('bf')))`, [email, password])
                logger.info('User result :', addUser);

                res.status(statusCode.success)
                .json({message: 'User created successfully '});
            }
        }catch(error){
            logger.error('Error while executing the Query', error);
            res.status(statusCode.queryError)
            .json({message: 'Error while executing register'});
        }
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body);
    if (!email || !password) {
        return res.status(statusCode.missingParameters)
            .json({ message: 'Parameters missing' });
    } else {
        const client = await pool.connect();

        try {
            const result = await client.query('SELECT * FROM users WHERE email = $1 and password = crypt($2, password)', [email, password]);

            if (result.rows.length > 0 && result.rows[0].email) {
                req.session.user = {
                    email: result.rows[0].email,
                };
             
                const token = jwt.sign({ email: result.rows[0].email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

                logger.info(`User: ${result.rows[0].email} logged in successfully`);
                res.status(statusCode.success).json({ message: token });
            } else {
                logger.error('User not found');
                res.status(statusCode.unauthorized)
                    .json({ message: 'Invalid credentials' });
            }

        } catch (error) {
            logger.error('Error while executing the Query', error);
            res.status(statusCode.queryError)
                .json({ message: 'Error while Login' });

        } finally {
            await client.release();
        }
    }
};

const logout = async (req, res) => {
    console.log(req.session.user);
    if (req.session.user){
        delete req.session;
        logger.info(`User logged out successfully`);
        return res.status(statusCode.success).
        json({ message: 'User logged out successfully' });

    }
    logger.error('No session found');
    return res.status(statusCode.badRequest).
    json({ message: 'No session found' });
}


module.exports ={
    register,
    login,
    logout,
}