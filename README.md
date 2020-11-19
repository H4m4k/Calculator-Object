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
