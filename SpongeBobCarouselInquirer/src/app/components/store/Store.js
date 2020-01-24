import { rerenderEntireTree } from '../render/Render';


let ask_ans = {

	ask1: 'Какой тропический плод исользует Спанч Боб вместо недвижимого имущества?',	
	ask2: 'Куда Спанч Боб ходит на работу?',
	ask3: 'Кто живет по соседству со Спанч Бобом?',
	ask4: 'Какими супергероями увлекаеться Спанч Боб?',
	ask5: 'Кто самый лучший друг спанч боба?',

	ans1: 'ананас',
	ans2: `В "Красти Краб"`,
	ans3_1: 'Сквидвард Квентин Тентаклс',
	ans3_2: 'Патрик Стар',    
    ans4: 'Морской Супермен и Очкарик',
    ans5: 'Патрик Стар',

    inputPlaceholder: 'Введите правильный ответ...',
    selectDefault: 'Выберете правильный ответ...'   

}

let resultTableStorage = JSON.parse(sessionStorage.getItem('resultTable')) || null;

let result_table_empty = {

	ans1: '',
	ans2: '',
	ans3: '',	   
    ans4: '',
    ans5: '',

    point1: '',
	point2: '',
	point3: '',	   
    point4: '',
    point5: '',

    totalPoint: '' 
}

let	result_table = Object.assign({}, result_table_empty);

if (resultTableStorage != null) result_table = resultTableStorage;


let store = {
	questions: [

	  	{        	
        	ask: ask_ans.ask1, 
        	pattern: `^[А-Яа-яЁё|a-zA-Z\s]+$`,
        	placeholder: ask_ans.inputPlaceholder
        },
        {        	
        	ask: ask_ans.ask2,        	
        	ansArray: [

        		{ key: 1, id: 'radioAsk1', name: 'radioAsk1', ans: 'На завод' },
        		{ key: 2, id: 'radioAsk2', name: 'radioAsk1', ans: `В "Мусорное Ведро"` },
        		{ key: 3, id: 'radioAsk3', name: 'radioAsk1', ans: ask_ans.ans2 },
        		{ key: 4, id: 'radioAsk4', name: 'radioAsk1', ans: 'Он не работает, он фрилансер' }
        	]
        },
        {        	
        	ask: ask_ans.ask3, 
        	proviso: '(Правельных ответов должно быть 2)',        	  
        	ansArray: [

        		{ key: 1, id: 'CheckAsk1', name: 'check1', check: true, ans: 'Джамбо Креветка' },
        		{ key: 2, id: 'CheckAsk2', name: 'check2', check: true, ans: ask_ans.ans3_1 },
        		{ key: 3, id: 'CheckAsk3', name: 'check3', check: true, ans: 'Миссис Пафф' },
        		{ key: 4, id: 'CheckAsk4', name: 'check4', check: true, ans: ask_ans.ans3_2 },
        		{ key: 5, id: 'CheckAsk5', name: 'check5', check: true, ans: 'Бабл Бас' },
        	]
        },
        {        	
        	ask: ask_ans.ask4,         	
        	name: 'selectAsk', 
        	ansArray: [

        		{ key: 1, hidden: true, disabled: true, ans: ask_ans.selectDefault },
        		{ key: 2, hidden: false, disabled: false, ans: 'Аквамен и Нептун' },
        		{ key: 3, hidden: false, disabled: false, ans: 'Мисс Невидимка и Профессор Магма' },
        		{ key: 4, hidden: false, disabled: false, ans: 'СпанчерМен и Патрикарик' },
        		{ key: 5, hidden: false, disabled: false, ans: 'Бэтман и Робин' },
        		{ key: 6, hidden: false, disabled: false, ans: ask_ans.ans4 },
        		{ key: 7, hidden: false, disabled: false, ans: 'Пыхарь и Хроник' },
        	]
        },
        {        	
        	ask: ask_ans.ask5,  
        	ansArray: [

        		{ key: 1, id: 'radioAsk2_1', name: 'radioAsk2', ans: 'Улитка Гэри' },
        		{ key: 2, id: 'radioAsk2_2', name: 'radioAsk2', ans: 'Сэнди Чикс' },
        		{ key: 3, id: 'radioAsk2_3', name: 'radioAsk2', ans: ask_ans.ans5 },
        		{ key: 4, id: 'radioAsk2_4', name: 'radioAsk2', ans: 'Сквидвард Квентин Тентаклс' }
        	]
        }
    ],
    result: [{

    	
    		thead: [

	    	  { key: 1, value: '#' },
	    	  { key: 2, value: 'Вопрос' },
	    	  { key: 3, value: 'Ответ' },
	    	  { key: 4, value: 'Очки' }
		    ],

		    sect1: 1,
		    tbodysect1: [

		      { key: 1, value: ask_ans.ask1 },
	    	  { key: 2, value: result_table.ans1 },
	    	  { key: 3, value: result_table.point1 }	

		    ],
		    sect2: 2,
		    tbodysect2: [

		      { key: 1, value: ask_ans.ask2 },
	    	  { key: 2, value: result_table.ans2 },
	    	  { key: 3, value: result_table.point2 }	

		    ],
		    sect3: 3,
		    tbodysect3: [

		      { key: 1, value: ask_ans.ask3 },
	    	  { key: 2, value: result_table.ans3 },
	    	  { key: 3, value: result_table.point3 }	

		    ],
		    sect4: 4,
		    tbodysect4: [

		      { key: 1, value: ask_ans.ask4 },
	    	  { key: 2, value: result_table.ans4 },
	    	  { key: 3, value: result_table.point4 }	

		    ],
		    sect5: 5,
		    tbodysect5: [

		      { key: 1, value: ask_ans.ask5 },
	    	  { key: 2, value: result_table.ans5 },
	    	  { key: 3, value: result_table.point5 }	

		    ],
		    total: result_table.totalPoint

		}],	



  
    message: ''

}

let stateInquirerStorage = JSON.parse(sessionStorage.getItem('stateInquirer')) || null;
	


export let stateInquirerEmpty = {

		openModal: false,
		submit: false,
		link: `/inquirer`,
    	inputAsk: '',    		
    	radioAsk1: '',
        radioAsk2: '',
        checkAsk1: '',
        checkAsk2: '',
        checkCount: 0,       
        check1: false,
        check2: false,
        check3: false,
        check4: false,
        check5: false,
        selectAsk: 'Выберете правильный ответ...'        

    }

export let stateInquirer = Object.assign({}, stateInquirerEmpty);		

       if (stateInquirerStorage != null) stateInquirer = stateInquirerStorage;



export let getTest = (test) => {

	let points = 0;

	if (test.inputAsk.toLowerCase() == ask_ans.ans1) {
		
		store.result[0].tbodysect1[1].value = test.inputAsk;
		store.result[0].tbodysect1[2].value = 20;
		points += 20;
		result_table.ans1 = test.inputAsk;
		result_table.point1 = 20;

	} else {

		store.result[0].tbodysect1[1].value = test.inputAsk;
		store.result[0].tbodysect1[2].value = 0;
		result_table.ans1 = test.inputAsk;
		result_table.point1 = 0;

	}

	if (test.radioAsk1 == ask_ans.ans2) {
		
		store.result[0].tbodysect2[1].value = test.radioAsk1;
		store.result[0].tbodysect2[2].value = 20;
		points += 20;
		result_table.ans2 = test.radioAsk1;
		result_table.point2 = 20;

	} else {

		store.result[0].tbodysect2[1].value = test.radioAsk1;
		store.result[0].tbodysect2[2].value = 0;
		result_table.ans2 = test.radioAsk1;
		result_table.point2 = 20;
	}

	if (test.checkAsk1 == ask_ans.ans3_1 || test.checkAsk1 == ask_ans.ans3_2) {		

		store.result[0].tbodysect3[1].value = test.checkAsk1;
		store.result[0].tbodysect3[2].value = 10;		
		points += 10;
		result_table.ans3 = test.checkAsk1;
		result_table.point3 = 20;

	} else {		

		store.result[0].tbodysect3[1].value = test.checkAsk1;
		store.result[0].tbodysect3[2].value = 0;
		result_table.ans3 = test.checkAsk1;
		result_table.point3 = 0;
	}
	
	if (test.checkAsk2 == ask_ans.ans3_1 || test.checkAsk2 == ask_ans.ans3_2) {		

		store.result[0].tbodysect3[1].value += ' ' + 'и' + ' ' + test.checkAsk2;
		store.result[0].tbodysect3[2].value += 10;		
		points += 10;
		result_table.ans3 += ' ' + 'и' + ' ' + test.checkAsk2;
		result_table.point3 += 10;

	} else {
		
		if (test.checkAsk2 == '') {
		
			store.result[0].tbodysect3[1].value += '';
			result_table.ans3 += '';

		} else {	

			store.result[0].tbodysect3[1].value += ' ' + 'и' + ' ' + test.checkAsk2;
			result_table.ans3 += ' ' + 'и' + ' ' + test.checkAsk2;			
		}

		store.result[0].tbodysect3[2].value += 0;
		result_table.point3 += 0;
	}

	if (test.selectAsk === ask_ans.ans4) {

		store.result[0].tbodysect4[1].value = test.selectAsk;
		store.result[0].tbodysect4[2].value = 20;
		points += 20;
		result_table.ans4 = test.selectAsk;
		result_table.point4 = 20;

	} 

	if (test.selectAsk === ask_ans.selectDefault) {
		
		store.result[0].tbodysect4[2].value = 0; 
		result_table.point4 = 0;
	}

	else {		

		store.result[0].tbodysect4[1].value = test.selectAsk;
		store.result[0].tbodysect4[2].value += 0;
		result_table.ans4 = test.selectAsk;
		result_table.point4 += 0;		
	}

	if (test.radioAsk2 == ask_ans.ans5) {
		
		store.result[0].tbodysect5[1].value = test.radioAsk2;
		store.result[0].tbodysect5[2].value = 20;
		points += 20;
		result_table.ans5 = test.radioAsk2;
		result_table.point5 = 20;

	} else {

		store.result[0].tbodysect5[1].value = test.radioAsk2;
		store.result[0].tbodysect5[2].value = 0;
		result_table.ans5 = test.radioAsk2;
		result_table.point5 = 0;
	}

	store.result[0].total = points;
	result_table.totalPoint = points;

	sessionStorage.setItem('resultTable', JSON.stringify(result_table));
	
	rerenderEntireTree(store)
}

export let anewTest = () => {

	stateInquirer = Object.assign({}, stateInquirerEmpty);
	result_table = Object.assign({}, result_table_empty);

}





export default store;