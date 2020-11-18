export function random () {
  const k1 = parseInt(Math.random() * 100000)
  const k2 = parseInt(Math.random() * 100000)
  const timeStemp = Date.now()
  return (k1 + timeStemp + k2)
}
