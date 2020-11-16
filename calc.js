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

  obiekt.value = screen.textContent;

  if ( event.target.classList.contains('sqrt')  ) {  // functions listener

    return display( Math.sqrt(obiekt.value));

  } else if ( event.target.classList.contains('funct') ) {   // functions listener
  
    switch(event.target.textContent) {
      
      case '%':
        return display ( '%' );   // not ready
        
      case 'CE':
        return display ( 'CE');   // not ready

      case 'C':
        return display(0);
      
      case '1/x':
        return display(1/x);    // not ready

      case 'x2':
        return display( exponent( obiekt.value ) );
    }

  } else if (event.target.classList.contains( 'divide' )) { // divide

    obiekt.operator = '/';
    return display( screen.textContent += obiekt.operator );

  } else if ( event.target.classList.contains( 'number' )) {  // keyboard listener

    switch(screen.textContent) {

      case '0':
        return display( screen.textContent = event.target.textContent ) ;
    }

    screen.textContent += event.target.textContent;
    
  } else if (event.target.classList.contains('sign')) { // sign change

    return display ( screen.textContent *= -1 );

  } 
}


function exponent( number ) {
  return screen.textContent = number ** 2;
}


function display ( content ) {
  obiekt.value = content;
  return screen.textContent = content;
}




/* Project guidelines:

Screen = arrays of objects ??

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
  h. 1/x 
  i. CE
  j. C    // done
  k. DEL  

Result object keys
1. value
2. sign
3. integer or decimal
4. state

Functions:
1. opSelector - operation selector
2. setSign - set sign of number                // done
3. checkState - check the state of the number ( before or after operation)
4. delScreenElement - remove last number added
5. displayFunction                             // done
6. getPress - listener for pressing of buttons // done

QoL:
1. Prevent multiple signs in adjacent places 
2. Prevent multiple decimal separators in adjacent places
3. Math round numbers that overexpand the display size
*/
