/*
Function that recursively converts children nodes of the tree nodes
input: root node of a tree
output: none, but it changes the values inside the tree

10.19.2022 Created
10.20.2022 Added comments
 */

import {dictionary} from "./dictionary";

export function M2LTree(treeNode) {
    if (treeNode.hasChildren()) { // check if the current node has child
        let numChildren = treeNode.children.length; // get the number of children of the current node
        for (let i = 0; i < numChildren; i++) { // iterate through the children
            let childVal = treeNode.children[i].value.toString(); // get value of the child
            if (childVal in dictionary) {
                // if the child is in the dictionary (an operator or etc.), get the LaTeX notation of that operator
                treeNode.children[i].value = dictionary[childVal]["rule"][(i + 1).toString() + "," + numChildren];
            }
            M2LTree(treeNode.children[i]); // recursively call the function on the child
        }
    }
}