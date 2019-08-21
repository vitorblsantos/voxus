let hasFieldError=false;
const createMask = string => {
		return string.replace(/(\d{2})(\d{5})(\d{4})/,"($1) $2-$3");
	},
	destroyMask = string => {
		return string.replace(/\D/g,'').substring(0, 11);
	},
	checkFieldValue = field =>{
	if(field.val().length > 3 && field.val().length > ''){
		field.next().removeClass('active');
		hasFieldError=false;
		return true;
		}
		else{
			field.next().addClass('active');
			field.next().html('Este campo é obrigatório');
			hasFieldError=true;
			return false;
		}
	},

	validateTel = field =>{
		let regex = /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/gm;
		if(field.val().match(regex)===null){
			field.next().addClass('active');
			field.next().html('Telefone inválido.');
			hasFieldError=true;
			
		}else{
			field.next().removeClass('active');
			hasFieldError=false;
		}
	},

	validateMail = field =>{
		let regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
		if(field.val().match(regex)===null){
			field.next().addClass('active');
			field.next().html('E-mail inválido.');
			hasFieldError=true;
		}else{
			field.next().removeClass('active');
			hasFieldError=false;
		}
		return false;
	},
	validateUrl = field =>{
		let regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:?#[\]@!\$&'\(\)\*\+,;=.]$/gm;
		if(field.val().match(regex)===null){
			field.next().addClass('active');
			field.next().html('Domínio inválido.');
			hasFieldError=true;
		}
		else{
			field.next().removeClass('active');
			hasFieldError=false;
		}
		return false;
	}

$(document).ready(function(){
	$('input').on('focus', function(){
		$(this).parent().addClass('focus');
	});
	$('input').on('focusout', function(){
		if($(this).val() === ''){
			$(this).parent().removeClass('focus');
		}
	})


	$(".tel").on("keyup", function(){
		$(".tel").val(destroyMask(this.value));
    	this.value = createMask($(".tel").val());
	})

	$('.send-form').click(() => {

		let botao = $('.send-form'), 
			nome = $('input[name="name"]'),
			telefone = $('input[name="telephone"]'),
			email = $('input[name="email"]'),
			empresa = $('input[name="enterpise-name"]'),
			url = $('input[name="url"]');

			checkFieldValue(nome);
			checkFieldValue(empresa);
			if(checkFieldValue(telefone)){
				validateTel(telefone);
			}
			if(checkFieldValue(email)){
				validateMail(email);
			}
			if(checkFieldValue(url)){
				validateUrl(url);
			}

			if(!hasFieldError){
				botao.html('Obrigado');
				botao.addClass('active');
				botao.next().addClass('active');
			}

		return false;
	})
})