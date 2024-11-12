function binarySearch(arr, target){
    let left = 0;
    let right = arr.length -1;

    while (left < right){
        mid = Math.floor((left + right) / 2)
        console.log(mid)
        if(arr[mid]==target)
            return mid
        else if(arr[mid] < target){
            left = mid+1
        }
        else
            right = mid -1
    }

    return -1;
}

let arr = [0,1,2,3,4,5,6,7]
console.log(binarySearch(arr, 5))