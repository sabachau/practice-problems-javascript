class Node{
    constructor(key,val){
        this.prev = null;
        this.next = null;
        this.val = val;
        this.key = key;
    }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.list = null;
    this.map = new Map();
    this.capacity = capacity;
    this.curSize = 0;
    this.head = null;
    this.tail = null;
};

 
 /*
 
 For every get request from the cache, the most recently accessed node must be moved to the front of the linked list. Therefore 
 first check will be if the node is already in front of the list, we can simply return the value and no other modifications would
 be necessary. If the node is not in the front of the linked list, then it is either in the middle or the tail itself(special case).
 If at the tail, we must update the tail pointer. If in the middle, we must remove it and hence reset all the incoming pointers
 to this node(from its prev and next). At the end, we'll move the node to the front of the list by updating-
 
 (i) the prev pointer of the head of the linked list to point to this node and 
 (ii) set the next pointer of the new node to point to head
 
 */
 
 /** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    let node = this.map.get(key);
    if(!node){
        return -1;
    }
    if(node === this.head){
        return node.val;
    }
    if(node === this.tail){
        this.tail.prev.next = null;
        this.tail = this.tail.prev;
    }else{
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    
    return node.val;
};

/*
First of all for every set request, we need to check if this is the first element being added to the list? If so, we must set the tail to 
point to this node.
If not, we next check if the node is already present in the list? If it is, we'll rewire the connections
by updating the incoming prev and next node pointers to this node, and move it to the head.
If not present, then we need to check if after adding to the list, if the no of nodes in cache would exceed the capacity of the cache? 
If so, we'll remove the least recently used node (which will be at the tail of the list).
At the end, we'll add this node to the map.
*/

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    let node = new Node(key,value);

    if(this.curSize === 0){
        this.tail = node;
    }else{
        this.head.prev=node;
        node.next=this.head;
    }
    this.head = node;
    
    if(this.map.get(key)){
        oldNode = this.map.get(key);
        if(oldNode === this.tail){
            this.tail.prev.next = null;
            this.tail = this.tail.prev;
        }else{
            oldNode.prev.next = oldNode.next;
            oldNode.next.prev = oldNode.prev;
        }
        this.map.delete(oldNode.key);
    }else{
        //map doesnt have it
        this.curSize++;
        if(this.curSize>this.capacity){
            //delete tail - least recently used
            this.map.delete(this.tail.key);
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.curSize--;
        }
    }
    
    this.map.set(key,node);
    
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = Object.create(LRUCache).createNew(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
 
