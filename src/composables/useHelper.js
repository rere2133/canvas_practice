export function useHelper() {
  const getDistance = (p1, p2) => {
    let temp1 = p1.x - p2.x
    let temp2 = p1.y - p2.y

    let dist = Math.pow(temp1, 2) + Math.pow(temp2, 2)

    return Math.sqrt(dist)

  }

  return {
    getDistance
  }
}