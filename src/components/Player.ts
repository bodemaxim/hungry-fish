import type { IPlayer } from '@/interfaces/IPlayer'

export const basicPlayerFish: IPlayer = {
  height: 22,
  width: 40,
  imagePath: 'images/shark-right.svg',
  imageRightPath: 'images/shark-right.svg',
  imageLeftPath: 'images/shark-left.svg',
  speed: 5,
  diagonalSpeed: 4,
  top: 0,
  left: 0,
  goesRight: true,
  headXWhenGoesRightRel: 0.7,
  headXWhenGoesLeftRel: 0.3,
  headYRel: 0.5,
  headRRel: 0.5,
  bodyXRel: 0.5,
  bodyYRel: 0.5,
  bodyRRel: 0.5,
  headXWhenGoesRight: 29,
  headXWhenGoesLeft: 11,
  headY: 11,
  headR: 11,
  bodyX: 20,
  bodyY: 11,
  bodyR: 11
}
