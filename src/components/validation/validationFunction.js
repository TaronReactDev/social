export let validation = (value, type) => {
    var patternEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;


    switch (type) {
        case "userName" :
            return value.length > 3;
        case "email" :
            return patternEmail.test(value);
            break;
        case "password" :
            return patternPassword.test(value);
            break;
        case "confirmPassword" :
            return patternPassword.test(value);
            break;
    }

    console.log(value)
    console.log(type)


}

