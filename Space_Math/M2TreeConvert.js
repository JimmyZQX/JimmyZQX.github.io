
/*
Input: a string of math text
Output: the corresponding parsed tree
Description: A function to parse math text to a tree

2022.10.12 created, only works for simple equation with operators at this stage.
2022.10.14 modify: replace id into position, add parenthese recursive parsing, refine structures
2022.10.21 modify: improve search: do not split keyword if it ends with letter and directly followed by letter
2022.10.25 modify: improve case that no-space and spaced operators are mixed (like 1 / 3+3 - 3)
*/
function M2TreeConvert(str){
    let tree = new Tree(0,str);
    let currentNode = tree.root;
    let inLoop = true;
    let stackedTreeNode = undefined;
    while (inLoop){
        let fullStr = currentNode.value;
        let startKey = 0; // denote start of keyword
        let startCounter = 0; //start of string which may contain keyword
        let counter = 0;
        let key = undefined;
        let keyType = undefined;
        while (fullStr.length > counter){
            let char = fullStr[counter];
            let endSearch = false;
            let breakSearch = false;
            if (isLeftPair(char)){
                let rpos = findPositionOfRightPair(fullStr,counter,char,getRightPair(char));
                if (rpos != -1){ 
                    let children = [fullStr.substring(0,counter), fullStr.substring(counter+1,rpos), fullStr.substring(rpos+1)];
                    currentNode.value = "";
                    let pNode = M2TreeConvert(children[1]).root;
                    pNode.pair.push([char,getRightPair(char)]);
                    pNode = combinePrev(children[0],pNode); // there are something before the pair, consider multiplication
                    stackedTreeNode = stackNode(stackedTreeNode, pNode); // put the symbol node on the stack
                        
                    fullStr = fullStr.substring(rpos+1);
                    funcStr = ""; 
                    counter = 0;
                    key = undefined;
                    keyType = undefined; //reset states;
                    endSearch = true;
                }
            }
            let j = startCounter;
            for (let j = startCounter; j <= counter; j++){
                if (fullStr[counter+1] && fullStr[counter].match(/[A-Za-z]/g) && fullStr[counter+1].match(/[A-Za-z]/g)){
                    continue; //we do not split keyword if it ends with letter and directly followed by letter
                }
                let subStr = fullStr.substring(j,counter+1);
                let type = getType(fullStr,subStr,counter);
                if (type){
                    key = subStr;
                    startKey = j;
                    keyType = type;
                    breakSearch = true;
                    break;
                }
                if (subStr == " " && (counter >= 1 || (currentNode.parent && currentNode.parent.children.length == 2 && currentNode.position == 1) || stackedTreeNode) && !containOperatorPure(findNextWord(fullStr,counter))){
                    key = subStr;
                    startKey = j;
                    keyType = "operator";
                    breakSearch = true;
                    break;
                }
            }
            if (breakSearch){
                break;
            }
            if (!endSearch){
                counter++;
                if (char.match(/[\s\d]/g)){ //we won't have number/space in keyword, so we can eliminate the possibility of happen a keyword on the left.
                    startCounter = counter;
                }
            }
        }
        if (key){ // found a key in the value of the currentNode;
            if (!dictionary[key] && key != " " && key !=""){
                key = translateTable.getItem(key)// translate the key if it is not directly in the dictionary;
            }
            
            let splitStr;
            let leftNode;
            let keyNode;
            let rightNode;
            switch (keyType){
                case "operator": //operators
                case "relation": //relations
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    leftNode = new TreeNode(0,splitStr[0],key);
                    keyNode = new TreeNode(0,splitStr[1],key);
                    rightNode = new TreeNode(0,splitStr[2],key);
                    if (stackedTreeNode){ // we have a stackedTreeNode 
                        stackedTreeNode = combinePrev(leftNode.value,stackedTreeNode); // there are something before the pair, consider multiplication
                        leftNode = stackedTreeNode;
                        leftNode.key = key;
                        stackedTreeNode = undefined;
                    }
                    let validPriority = true;
                    if (isOperatorPure(key) && fullStr[startKey - 1] && fullStr[counter + 1] && fullStr[startKey - 1] != " " && fullStr[counter + 1] != " "){
                        validPriority = false;
                    }
                    if (validPriority && (currentNode.noPriority || getPriority(key) < getPriority(currentNode.key))){ // the new key has a higher priority, need to split string
                        let solved = false;
                        currentNode.value = leftNode.value;
                        currentNode.children = leftNode.children;
                        currentNode.pair = leftNode.pair;
                        while (currentNode.parent){
                            let lastNodePos = currentNode.position;
                            currentNode = currentNode.parent;
                            if (!currentNode.children[0].noPriority && getPriority(key) >= getPriority(currentNode.children[0].key)){
                                let lastNode = currentNode.children[lastNodePos];
                                let newNode = new TreeNode(lastNodePos,null,currentNode.children[0].key);
                                newNode.noPriority = currentNode.children[lastNodePos].noPriority;
                                currentNode.children[lastNodePos] = newNode;
                                newNode.parent = currentNode;
                                newNode.insertNode(lastNode);
                                lastNode.key = key;
                                
                                //newNode.insertNode(leftNode);
                                newNode.insertNode(keyNode);
                                newNode.insertNode(rightNode);

                                currentNode = newNode.children[2];
                                solved = true;
                                break;
                            }
                        }
                        if (!solved){ //this mean we should reach the root level
                            let newroot = new TreeNode(0,"");
                            tree.root.key = key;
                            newroot.insertNode(tree.root);
                            newroot.insertNode(keyNode);
                            newroot.insertNode(rightNode);
                            tree.root = newroot;
                            currentNode = tree.root.children[2];
                        }   
                    } else {
                        if (!validPriority){
                            leftNode.noPriority = true;
                            keyNode.noPriority = true;
                            rightNode.noPriority = true;
                        }
                        currentNode.value = "";
                        currentNode.insertNode(leftNode);
                        currentNode.insertNode(keyNode);
                        currentNode.insertNode(rightNode);
                        currentNode = currentNode.children[2];
                    }
                    break; //break case

                case "function": //functions
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    if (splitStr[2][0] == " "){
                        splitStr[2] = splitStr[2].substring(1)
                    }
                    leftNode = new TreeNode(0,splitStr[0],key);
                    keyNode = new TreeNode(0,splitStr[1],key);
                    rightNode = new TreeNode(0,splitStr[2],key);
                    if (stackedTreeNode){ // we have a stackedTreeNode 
                        stackedTreeNode = combinePrev(leftNode.value,stackedTreeNode); // there are something before the pair, consider multiplication
                        leftNode = stackedTreeNode;
                        leftNode.key = key;
                        stackedTreeNode = undefined;
                    }
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    let funcNode = new TreeNode;
                    funcNode.value = "";
                    funcNode.insert(key,key);
                    rightNode.key = key;
                    funcNode.insertNode(rightNode);
                    funcNode = combinePrev(splitStr[0],funcNode); // there are something before the pair, consider multiplication
                    if (currentNode.parent){
                        currentNode.parent.children[currentNode.position] = funcNode;
                    } else {
                        tree.root = funcNode;
                        //it is the root
                    }
                    
                    currentNode = funcNode.children[1];
                    break;
                case "symbol": //symbols
                    splitStr = [fullStr.substring(0,startKey), key, fullStr.substring(counter+1)];
                    let symbolNode = new TreeNode;
                    symbolNode.value = "";
                    symbolNode.insert(key,key);
                    symbolNode = combinePrev(splitStr[0],symbolNode); // there are something before the pair, consider multiplication
                    stackedTreeNode = stackNode(stackedTreeNode, symbolNode); // put the symbol node on the stack
                    currentNode.value = splitStr[2];
                    break;
            }
        } else {
            if (stackedTreeNode){ //left with some undealt pair
                if (fullStr.trim()!=""){
                    let tempNode = new TreeNode;
                    stackedTreeNode.key = "";
                    tempNode.insertNode(stackedTreeNode);
                    tempNode.insert("","");
                    tempNode.insert(fullStr,"");
                    stackedTreeNode = tempNode;
                }
                //stackedTreeNode = combineAfter(fullStr,stackedTreeNode); // there are something before the pair, consider multiplication
                let cpos = currentNode.position;
                stackedTreeNode.position = cpos;
                stackedTreeNode.key = currentNode.key;
                if (currentNode.parent){
                    stackedTreeNode.parent = currentNode.parent;
                    currentNode.parent.children[cpos] = stackedTreeNode;
                } else {
                    tree.root = stackedTreeNode;
                }
            }
            inLoop = false;
            break;
        }
    }
    return tree;
}

/*
Description: put a node on the stack. If we already have something on stack then multiply them.
Arguments: the current stackedTreeNode and the node to be put on the stack.
return: the new stackedTreeNode
2022.10.26 created;
*/
function stackNode(stackedTreeNode, pNode){
    if (stackedTreeNode){ //already exists a node in stack, so they should be multiplied/composited
        let tempNode = new TreeNode;
        stackedTreeNode.key = "";
        tempNode.insertNode(stackedTreeNode);
        tempNode.insert("","");
        pNode.key = "";
        tempNode.insertNode(pNode);
        stackedTreeNode = tempNode;
    } else {
        stackedTreeNode = pNode;
    }
    return stackedTreeNode;
}

/*
Description: do multiplication for leftover previous info
Arguments: the previous info and the current holding node
return: the adjusted holding node
2022.10.26 created;
*/

function combinePrev(preVal,pNode){
    if (preVal.trim()!=""){ // there are something before the pair, consider multiplication
        let tempNode = new TreeNode;
        pNode.key = "";
        tempNode.insert(preVal,"");
        tempNode.insert("","");
        tempNode.insertNode(pNode);
        pNode = tempNode;
    }
    return pNode;
}

/*
Description: do multiplication for leftover after info
Arguments: the previous info and the current holding node
return: the adjusted holding node
2022.10.26 created;
*/

function combineAfter(followingVal,pNode){
    if (followingVal.trim()!=""){ // there are something before the pair, consider multiplication
        let tempNode = new TreeNode;
        pNode.key = "";
        tempNode.insertNode(pNode);
        tempNode.insert("","");
        tempNode.insert(followingVal,"");
        pNode = tempNode;
    }
    return pNode;
}

/*
Description: function to detect if we have a keyword and returns its type
Arguments: the whole string, the current word, and the position of the end of the word
return: the type of the keyword, or undefined if it is not a keyword
2022.10.12 created, 
2022.10.17 abstractized
2022.10.19 modified to check if in a longer keyword
2022.10.26 combined into one function
*/
function getType(str,key,pos){
    let keyword = getKeyword(key);
    if (keyword && !containedInKeyword(str,key,pos)){
        return keyword.type;
    } else {
        return undefined;
    }
}

/*
Description: function to get keyword
2022.10.19 created, 
*/
function getKeyword(key){
    if (dictionary[key]){
        return dictionary[key];
    } else {
        key = translateTable.getItem(key);
        if (key == -1){
            return undefined;
        } else {
            return dictionary[key];
        }
    }
    
}

/*
Description: function to detect left parenthese
2022.10.14 created, 
*/
function isLeftPair(key){
    return ["(","[","{"].includes(key);
}

/*
Description: function to tell the corresponding right parenthese based on the left one
2022.10.14 created, 
*/

function getRightPair(key){
    switch (key){
        case "(":
            return ")";
        case "[":
            return "]";
        case "{":
            return "}";
    }
}

/*
Description: function to detect operators
2022.10.19 created, 
*/
function isOperatorPure(key){
    let keyWord = getKeyword(key);
    return keyWord && keyWord.type == "operator";
}

/*
Description: function to detect operators containment
2022.10.20 created, 
*/
function containOperatorPure(key){
     for (let j = 1; j <= key.length; j++){
        let subStr = key.substring(0,j);
        if (isOperatorPure(subStr)){
            return true;
        }
     }
     return false;
}


/*
Description: function to detect relations
2022.10.19 created, 
*/
function isRelationPure(key){
    let keyWord = getKeyword(key);
    return keyWord && keyWord.type == "relation";
}

/*
Description: function to detect operators or spaces
2022.10.19 created,
*/
function isOperatorRelationPure(key){
    return isOperatorPure(key) || isRelationPure(key);
}


/*
Description: function to detect operators or spaces
2022.10.12 created, 
2022.10.19 modified to match with changes.
*/
function isOperatorRelationOrSpace(key){
    return isOperatorPure(key) || isRelationPure(key) || [" ",""].includes(key);
}

/*
Description: function to tell the priority of operators/symbols
2022.10.12 created, 
2022.10.17 abstractized
*/

function getPriority(key){
    let keyWord = getKeyword(key);
    switch (key){
        case " ":
        case "":
            return 19;
        default:
            if (keyWord){
                return keyWord.priority;
            } else {
                return 999;
            }
    }
}

/*
Description: given a string, a position of the left parenthese, find the position of the paired up right parenthese (regardless of type).
2022.10.19 created, 
*/

function findPositionOfRightParenthese(str, pos) {
  if (!["(","[","{"].includes(str[pos])) {
    throw new Error("No" + lp + " at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
    case "(":
    case "[":
    case "{":
      depth++;
      break;
    case ")":
    case "]":
    case "}":
      if (--depth == 0) {
        return i;
      }
      break;
    }
  }
  return -1;    // No matching closing parenthesis
}

function findPositionOfRightPair(str, pos, lp, rp) {
  if (str.substring(pos,pos+rp.length) != lp) {
    throw new Error("No" + lp + " at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str.substring(i,i+rp.length)) {
    case lp:
      depth++;
      break;
    case rp:
      if (--depth == 0) {
        return i;
      }
      break;
    }
  }
  return -1;    // No matching closing parenthesis
}

/*
Description: given a string, a position of the space, get all the contents till the next space (or end of string)).
2022.10.19 created, 
*/

function findNextWord(str, pos) {
  let content = "";
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
    case "\n":
    case " ":
      break;
    default:
        content += str[i];
    }
  }
  return content;
}

/*
Description: given a string, the current keyword, the position of the end of the keyword, check if we can find a longer keyword).
2022.10.19 created, 
*/

function containedInKeyword(str, key, pos) {
  let content = "";
  for (let i = pos + 1; i < str.length; i++) {
      if (str[i].match(/[\s\d]/g)){
        break;
      } else {
         key += str[i];
        if (getKeyword(key)){
            return true;
        }
      }
  }
  return false;    // No matching longer keyword
}