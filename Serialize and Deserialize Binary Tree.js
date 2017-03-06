/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
//Sample Input: [1,2,3,null,5,6,7,null,null,null,null,8,null]

var serialize = function(root) {
    var result = [];
    serializer(root,result); 
    console.log(result); //[1,2,3,'#',5,6,7,'#','#','#','#',8,'#']
    console.log(typeof result[0]); //"Number"
    result = result.join(","); //1,2,3,#,5,6,7,#,#,#,#,8,#
    console.log(typeof result[0]); //"String"
    return result;
};

var serializer = function(root,output){
    if(root===null){
        output.push("#");
        return;
    }
    
    output.push(root.val);
    serializer(root.left,output);
    serializer(root.right,output);
    
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    data = data.split(",");
    var index = 0;
    
    function deserializer(data){
        if(index > data.length || data[index]==="#"){
            return null;
        }
        var node = new TreeNode(parseInt(data[index]));
        index++;
        node.left = deserializer(data);
        index++;
        node.right = deserializer(data);
        return node;
    }
    
    return deserializer(data);
};
