/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    var map={};
    for(var i=0; i<nums.length;i++){
        var num = nums[i];
        if(map[num] !== undefined){
            return [map[num], i];
        }else{
            map[target-num] = i;
        }
    }
    
    return [];
};
