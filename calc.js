const screen = document.querySelector('#display');

const keys = document.querySelector('#keyboard');
const arithmeticKeys = document.querySelector('#arithmetic');
const functionKeys = document.querySelector('#functions');

keys.addEventListener( 'click' , getPress );
arithmeticKeys.addEventListener( 'click' , getPress );
functionKeys.addEventListener( 'click' , getPress );

const obiekt = {
  value: 0,
  operator: '',
  secondValue: 0,
  state: ''
} ;





// ----=== FUNCTIONS ===----- 

function getPress(event) {

  if ( event.target.classList.contains('sqrt')  ) {  // functions listener

    return display( Math.sqrt(obiekt.value));

  } else if ( event.target.classList.contains('funct') ) {   // functions listener
  
    switch(event.target.textContent) {
      
      case '%':
        return display ( '%' );   // not ready
        
      case 'CE':
        return display ( 'CE');   // not ready

      case 'C':
        clear();
        return display(0);
      
      case '1/x':
        return display( 1/obiekt.value );   

      case 'x2':
        return display( exponent( obiekt.value ) );
    }

  } // end of functions listener 


const dataOp = document.querySelectorAll('[data-operator]');
  
for ( let i = 0; i < dataOp.length ; i++) {
  if ( event.target.textContent === dataOp[i].textContent ) {
    obiekt.operator = dataOp[i].textContent;
    return operatorCheck(event.target.textContent);
  }

}


  
  
  if ( event.target.classList.contains( 'number' )) {  // keyboard listener
      switch(screen.textContent) {

        case '0':
          return display( screen.textContent = event.target.textContent ) ;
      } // end of switch

    return display ( screen.textContent += event.target.textContent);
    
  } else if (event.target.classList.contains('sign')) { // sign change
      return display ( screen.textContent *= -1 );

  } else if (event.target.classList.contains('dot')) {
      operatorCheck(event.target.textContent);
  }
}


function exponent( number ) {
    return screen.textContent = number ** 2;
}

function display ( content ) {
  
  switch(obiekt.state) {
    case '':
      obiekt.value = content*1;
      return screen.textContent = `${obiekt.value}`;

    case 'operatorPresent':
      return screen.textContent = `${obiekt.value}${obiekt.operator}`

    case 'secondaryValue':
      obiekt.secondValue = content*1;
      return screen.textContent = `${obiekt.value}${obiekt.operator}${obiekt.secondValue}`
  }
  
}

function clear() {
  obiekt.operator = '';
  obiekt.state = '';
}

function operatorCheck ( operator ) {
  if ( !screen.textContent.includes(operator)) {

    switch (obiekt.state) {
      case '':
        obiekt.operator = operator;  
        obiekt.state = 'operatorPresent';
        return display(screen.textContent + obiekt.operator)

      case 'operatorPresent':
        return display(screen.textContent);
      }  

  } 
}

/* Project guidelines:

Screen = value operator secondValue

Number object keys:                             // done
1. value
2. operator - for selecting the operation
3. secondValue 
  a. state ( before or after operation) ??
  b. Possible sub-states ??

Operation object keys:
1. Type of operation ( 
  a. + 
  b. - 
  c. * 
  d. / 
  e. sqr  // done
  f. **   // done
  g. %
  h. 1/x  // done
  i. CE
  j. C    // done
  k. DEL  

Result object keys
1. value
2. state

Functions:
1. opSelector - operation selector
2. setSign - set sign of number                // done
3. checkState - check the state of the number ( before or after operation)
4. delScreenElement - remove last number added
5. displayFunction                             // done
6. getPress - listener for pressing of buttons // done
7. checkOperator - checks for any adjacent . or arithmetic operators  // done
8. clear - resets the display, object state, object operator  // done

QoL:
1. Prevent multiple signs in adjacent places    // done
2. Prevent multiple decimal separators in adjacent places // done
3. Math round numbers that overexpand the display size

*/
