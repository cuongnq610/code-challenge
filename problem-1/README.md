# Summing numbers from 0 to n — three approaches

**1. For-loop (`sumToN_1`)**

- Description: iterate from `0` to `n` and accumulate the running total.
- Time complexity: O(n)
- Memory complexity: O(1)

---

**2. Mathematical formula (`sumToN_2`)**

- Description: use Gauss's formula: sum = n \* (n + 1) / 2.
- Time complexity: O(1)
- Memory complexity: O(1)

---

**3. Generator + iteration (`sumToN_3`)**

- Description: a generator yields each integer from `0` to `n`; a `for..of` loop consumes the generated values and sums them.
- Time complexity: O(n)
- Memory complexity: O(1) (generator yields values lazily)
