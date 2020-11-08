export default function CreateAccountValidations(values) {
	
	let errores = {};

	if(!values.nombre) {
		errores.nombre ="El nombre es obligatorio"
	}

	if(!values.email) {
		errores.email = "El mail es obligatorio";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
		errores.email = "El mail no es valido"
	}

	if(!values.password) {
		errores.password = "El password es obligatorio";
	}else if (values.password.length < 6 ) {
		errores.password = "El password debe tener al menos 6 caracteres"
	}

	return errores;
}