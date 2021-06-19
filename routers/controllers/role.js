const roleModel = require('./../../db/models/role');
const db=require('./../../db/db')
const createNewRole = (req, res) => {
	const { role } = req.body;

	const query=`INSERT INTO roles (role) VALUES (?);`
	const array=[role]
	db.query(query,array,(err,result)=>{
		if(err)throw err
		const query=`SELECT * FROM roles WHERE role=?;`
		const array=[role]
		db.query(query,array,(err,result_1)=>{
			if(err)throw err
			res.json(result_1)
		})
		
	})
};

module.exports = {
	createNewRole,
};
