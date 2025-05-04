const { pool } = require('../config/db.js')
const createStudent = async (student) => {
    try {
        const { first_name, last_name, email, phone } = student
        const Text = 'INSERT INTO students (first_name,last_name,email,phone) VALUES ($1,$2,$3,$4) RETURNING *';
        const Value = [first_name, last_name, email, phone]
        const result = await pool.query(Text, Value);
        console.log(result);

        return result.rows[0];
    }
    catch (err) {
        return err
    }

}
const getAllStudent = async (page, limit) => {
    try {
        const offset = (page - 1) * limit;
        const Text = 'SELECT * FROM students ORDER BY id  LIMIT $1 offset $2';
        const Value = [limit, offset];
        const result = await pool.query(Text, Value);
        const { rows } = await pool.query('SELECT COUNT(*) FROM students')
        console.log({ rows, limit, page, remainData: rows[0].count - limit * page });

        return result.rows;
    }
    catch (err) {
        return err
    }

}
const updateStudentRecord = async (email, id) => {
    let Text = 'UPDATE students SET email = $1 WHERE id = $2 RETURNING *';
    let Value = [email, id];

    const updateStudent = await pool.query(Text, Value);
    return updateStudent.rows;
}
const deleteStudent = async (id) => {
    console.log(id);

    const Text = 'DELETE FROM Students where id=$1';
    const Value = [id];
    const delete_Student = await pool.query(Text, Value);
    console.log(delete_Student);

    return delete_Student.rows;
}

module.exports = { createStudent, getAllStudent, updateStudentRecord, deleteStudent }