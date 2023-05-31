class Sort {
  constructor(array, comparator) {
    this.array = array;
    this.comparator = comparator;
  }

  /**
   * 퀵 정렬을 수행한다.
   */
  run() {
    this.quickSort(0, this.array.length - 1);
  }

  quickSort(left, right) {
    if (left >= right) return;
    const mid = this.partition(left, right);
    this.quickSort(left, mid - 1);
    this.quickSort(mid + 1, right);
  }

  partition(left, right) {
    let i = left + 1;
    let j = right;
    while (i < j) {
      while (i <= right) {
        if (!this.comparator(this.array[i], this.array[left])) {
          break;
        }
        i++;
      }

      while (j > left) {
        if (this.comparator(this.array[j], this.array[left])) {
          break;
        }
        j--;
      }
      if (i < j) {
        const t = this.array[j];
        this.array[j] = this.array[i];
        this.array[i] = t;
      }
    }

    const t = this.array[left];
    this.array[left] = this.array[j];
    this.array[j] = t;

    return j;
  }
}

export default Sort;
