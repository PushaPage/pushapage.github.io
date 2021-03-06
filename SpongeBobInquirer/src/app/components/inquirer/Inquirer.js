import React from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import './Inquirer.sass';


class Inquirer extends React.Component {

  	constructor(props) {
  		super(props);               		
      
  		this.state = { ...this.props.stateInquirer };       
	}

  checkSubmit = () => {   

    setTimeout( () => {

      let {

        inputAsk,       
        radioAsk1,
        radioAsk2,
        checkAsk1,
        checkAsk2,
        selectAsk

      } = this.state;  

      if (inputAsk == '' || radioAsk1 == '' ||
          radioAsk2 == '' || checkAsk1 == '' ||
          checkAsk2 == '' || selectAsk == 'Выберете правильный ответ...') {

        this.setState({ submit: false, link: `/inquirer` });                           

      } else {     
      
        this.setState({ submit: true, link: `/result` });             
                 
      }   

      sessionStorage.setItem('stateInquirer', JSON.stringify(this.state));

    }, 100)    
  }

  onHold = event => {

    event.preventDefault()
  }

	handleInput = event => {

    let { name, value } = event.target;        

        this.setState({ [name]: value });
  }

  handleRadio = event => {
      
    let { name, value } = event.target; 

      this.setState({ [name]: value });           
  }

  handleCheckBox = event => {
   
    let { name, checked, value } = event.target;             
       
    if (checked) {

       this.state.checkCount ++;
       this.setState({ [name]: checked })

       if (this.state.checkCount == 1) {
          
          this.setState({ checkAsk1: value })
       } 
       if (this.state.checkCount == 2) {
          
          this.setState({ checkAsk2: value })
       }

    } else {

       this.state.checkCount --;
       this.setState({ [name]: checked })
    }

    if (!checked && this.state.checkCount == 0) { 

        this.setState({ checkAsk1: '' })
    } 

    if (!checked && this.state.checkCount == 1) { 

          this.setState({ checkAsk2: '' })
    } 
    if (this.state.checkCount > 2){      

      if (this.state[name] == false){          

        this.setState({ [name]: false, checkCount: 2 }) 
                    
      } else if (this.state[name] == true) { 

        this.setState({ [name]: false })
      } 
    }                    
  }

  handleSelect = event => {

    let { name, value } = event.target;

      this.setState({ [name]: value });        
  }  

  resetForm = () => {    
  
    sessionStorage.removeItem('stateInquirer')
  
    for (let key in this.props.stateInquirerDefault) {

      this.props.stateInquirer[key] = this.props.stateInquirerDefault[key];  
      this.setState({ [key]: this.props.stateInquirerDefault[key] });      
    }
  }

  submit = () => { 

      this.props.getTest(this.state)
      this.resetForm()
      this.onCloseModal()                               
  }    

  onOpenModal = event => {

    event.preventDefault()
    this.setState({ openModal: true });
  };
 
  onCloseModal = () => {
    
    this.setState({ openModal: false });    
  };

	render() {

    let questions = this.props.questions;        

    let {

        answersRadioOne,
        answersCheckBox,
        answersSelect,
        answersRadioTwo

    } = this.props.answers;  
        

    let { openModal, link } = this.state;               	

	  return ( 
	     <div className="inquirer-container container">           
            <div className="title-item">
              <h2 className="title-text">Каждый правильный ответ - 20 очков!</h2>            
            </div>         
          <div className="img-inquirer-title d-none d-md-block">
            <img               
              src="./img/patrick-inquirer.png" 
              alt="SpongeBob"
            />
          </div>       
	  	    <form           
            onSubmit={this.state.submit === false ? this.onOpenModal : this.onHold}  
            onChange={this.checkSubmit}>           
              <div className="col-12 col-sm-11 col-lg-10 ask-one-curve">
                <div className="ask-one">
                  <p>{questions.ask1}</p>      
    	  	        <input 
                    className="form-control" 
                    onChange={this.handleInput} 
                    name="inputAsk"  
                    value={this.state.inputAsk} 
                    type="text"
                    autoComplete="off"
                    placeholder={questions.inputPlaceholder}
                    pattern={questions.pattern}
                  />
                </div>  
  	  	      </div>             
  	  	      <div className="col-12 col-sm-11 col-lg-9 ask-two-curve">               
                <div className="ask-two">
                  <p>{questions.ask2}</p>
                  <ul className="ul-label">
                    {answersRadioOne.map( prop => {
                      return (
                        <li key={prop.key}>
                  		    <input                        
                            type="radio" 
                            id={prop.id}
                  		      name={prop.name}
                            value={prop.ans}
                            onChange={this.handleRadio} 
                            checked={this.state.radioAsk1 === prop.ans}
                          />
                  		    <label htmlFor={prop.id}>{prop.ans}</label>
                        </li>
                      )}  
                    )}
                  </ul>                  
                </div>        		    
      		    </div>           
              <div className="col-12 col-sm-11 ask-three-curve">
                <div className="d-flex flex-column ask-three">
                  <p>{questions.ask3}</p>
                  <span className="ask-proviso">{questions.checkProviso}</span>
                  <div className="d-flex justify-content-between"> 
                    <ul className="ul-label">
                      {answersCheckBox.map( prop => {
                        return (
                          <li key={prop.key}>
                            <input                        
                              type="checkbox" 
                              id={prop.id}
                              name={prop.name} 
                              value={prop.ans}
                              onChange={this.handleCheckBox} 
                              checked={this.state[prop.name]}
                            />
                            <label htmlFor={prop.id}>{prop.ans}</label>
                          </li>
                        )}  
                      )}
                    </ul>
                    <img
                      className="img-inquirer img-fluid d-none d-md-block"  
                      src="./img/sponge-inquirer.png" 
                      alt="SpongeBob"
                    />
                  </div>                    
                </div>                
              </div>             
              <div className="col-12 col-sm-11 col-lg-8 ask-four-curve">
                <div className="ask-four">
                  <p>{questions.ask4}</p>
                    <select 
                      className="form-control"
                      name={questions.selectName} 
                      value={this.state.selectAsk}
                      onChange={this.handleSelect} 
                    >
                    {answersSelect.map( prop => {
                      return (
                        <option
                          key={prop.key}
                          hidden={prop.hidden} 
                          disabled={prop.disabled}                            
                          value={prop.ans}
                          >{prop.ans}
                        </option>
                      )}  
                    )}         
                    </select>
                </div>                
              </div>           
              <div className="col-12 col-sm-11 ask-five-curve">
                <div className="ask-five">
                  <p>{questions.ask5}</p>
                  <ul className="ul-label">
                    {answersRadioTwo.map( prop => {
                      return (
                        <li key={prop.key}>
                          <input                        
                            type="radio" 
                            id={prop.id}
                            name={prop.name}
                            value={prop.ans}
                            onChange={this.handleRadio} 
                            checked={this.state.radioAsk2 === prop.ans}
                          />
                          <label htmlFor={prop.id}>{prop.ans}</label>
                        </li>
                      )}  
                    )}
                  </ul>                  
                </div>                
              </div>            
            <div className="btn-box-inquirer">              
                <Link 
                  to={link} 
                  role="button" 
                  className="btn btn-warn btn-warn-Inquirer" 
                  onClick={this.state.submit === false ? this.onOpenModal : this.submit}>Проверить</Link>                 
		            <button type="button" className="btn btn-dang btn-dang-Inquirer" onClick={this.resetForm}>Очистить поля</button>             
              <img  
                className="img-inquirer d-none d-md-block"             
                src="./img/gary-inquirer.png" 
                alt="SpongeBob"
              />	  	        
            </div>  
	  	  </form>
                
        <Modal 
            open={openModal}
            onClose={this.onCloseModal} 
            center>
            <h2>Каждый неотвеченный вопрос считается 
            неправильным. Вы уверены что хотите продолжить?
            <img 
                className="img-modal img-fluid d-none d-sm-block" 
                src="./img/patrick-modal.png" 
                alt="SpongeBob"
            />
            </h2>
            <div className="btn-box-modal">               
              <Link to="/result" role="button" className="btn btn-dang btn-dang-modal" onClick={this.submit}>Да</Link>               
              <button type="button" className="btn btn-warn btn-warn-modal" onClick={this.onCloseModal}>Нет</button>              
            </div>  
        </Modal>  
	  	</div>
     

	  	)
	}
}	  

export default Inquirer;

