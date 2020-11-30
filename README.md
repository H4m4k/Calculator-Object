# Calculator-Object

This is a second Calculator training project - recreated after discussing previous project.
First of all the previous one has been built based on too many strings and anonymous functions which may encounter problems if the project gets to see the light of internet.
Secondly a lot of code has been written more than once and that is one of base purpose of what functions are for

/* Project guidelines:

Screen = value operator secondValue

Number object keys:                             // done
1. value
2. operator - for selecting the operation
3. secondValue
  a. state ( before or after operation) ??
  b. result ( clear the screen after pressing equal and return the value to 1.)

Operation object keys:
1. Type of operation (
  a. +  // done
  b. -  // done
  c. *  // done
  d. /  // done
  e. sqr  // done
  f. **   // done
  g. %
  h. 1/x  // done
  i. CE   // done
  j. C    // done
  k. DEL  // done


// Used as a key of object instead of a independent object 
Result object keys
1. value
2. state

Functions:
1. opSelector - ad.7 operotarCheck  // done 
2. setSign - set sign of number                // done
3. checkState - check the state of the number ( before or after operation)  // done   operator check and display use this in switch/case
4. delScreenElement - remove last number added  // done
5. displayFunction                             // done
6. FunctionPress - listener for pressing of buttons // done
7. checkOperator - checks for any adjacent . or arithmetic operators  // done
8. clear - resets the display, object state, object operator  // done

QoL:
1. Prevent multiple signs in adjacent places    // done
2. Prevent multiple decimal separators in adjacent places // done
3. Math round (substring or toFixed with regular expression) numbers that overexpand the display size
4. Allow operations on two decimal numbers
*/
