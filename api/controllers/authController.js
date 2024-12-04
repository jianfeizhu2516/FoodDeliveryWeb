import db from "../db.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doc, setDoc, addDoc, collection, getDoc, query, where, getDocs } from "firebase/firestore";
export const login = async (req, res) => {
    const { email, password } = req.body;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if(querySnapshot.empty){
        return res.status(404).json({ message: 'User not found!' })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, querySnapshot.docs[0].data().password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong username or password!" });
    
    const token = jwt.sign({ email: req.body.email }, "jwtkey");

    res.cookie('access_token', token, { httpOnly: true })

    return res.status(200).json({ message: "Login successul" })
    // const q = 'SELECT * FROM users WHERE email = ?';

    // db.query(q, [req.body.email], (err, results) => {
    //     if (err) return res.status(500).json({ message: err.message })
    //     console.log('results是是', results)
    //     if (results?.length === 0) return res.status(404).json({ message: 'User not found!' })
    //     //check password
    //     const isPasswordCorrect = bcrypt.compareSync(req.body.password, results[0].password);

    //     if (!isPasswordCorrect) return res.status(400).json({ message: "Wrong username or password!" });

    //     const token = jwt.sign({ email: req.body.email }, "jwtkey");

    //     res.cookie('access_token', token, { httpOnly: true })

    //     return res.status(200).json({ message: "Login successul" })
    // })
}

export const signup = async (req, res) => {

    const { email, password } = req.body;

    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        return res.json({ message: "Email has alrady been used" })
    }

    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const token = jwt.sign({ email }, "jwtkey");
    try {
        await addDoc(collection(db, "users"), {
            email: email,
            password: hashedPassword
        })
        return res.status(201).cookie("access_token", token, {
            httpOnly: true
        }).json({ message: 'User registration successful' })
    } catch (err) {
        console.log('sign up failed', err)
    }

}
