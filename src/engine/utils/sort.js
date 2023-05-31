class Sort {
  constructor(array, comparator) {
    this.array = array;
    this.comparator = comparator;
  }

  /**
   * 퀵 정렬을 수행한다.
   */
  run() {
    this.quickSort(0, this.array.length-1);
  }

  quickSort(left, right) {
    if (left >= right) return;
    const mid = this.partition(left, right);
    this.quickSort(left, mid - 1);
    this.quickSort(mid, right);
  }

  partition(left, right) {
    let pivot = Math.floor(left + (right - left) / 2);
    while (left <= right) {
      while (
        left <= pivot &&
        this.comparator(this.array[left], this.array[pivot])
      ) {
        left++;
      }
      while (
        right > pivot &&
        this.comparator(this.array[pivot], this.array[right])
      ) {
        right--;
      }
      if (left <= right) {
        const t = this.array[right];
        this.array[right] = this.array[left];
        this.array[left] = t;
        left++;
        right--;
      }
    }
    return left;
  }
}

export default Sort;
