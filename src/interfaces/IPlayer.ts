export interface IPlayer {
  /**
   * Высота рыбы игрока.
   * @type {number}
   */
  height: number
  /**
   * Ширина рыбы игрока.
   * @type {number}
   */
  width: number
  /**
   * Путь к изображению рыбы, отображаемому сейчас.
   * @type {string}
   */
  imagePath: string
  /**
   * Путь к изображению рыбы, плывущей направо.
   * @type {string}
   */
  imageRightPath: string
  /**
   * Путь к изображению рыбы, плывущей налево.
   * @type {string}
   */
  imageLeftPath: string
  /**
   * Скорость рыбы (смещение в px каждый кадр).
   * @type {number}
   */
  speed: number
  /**
   * Скорость рыбы при движении по диагонали (смещение в px по X и по Y каждый кадр).
   * @type {number}
   */
  diagonalSpeed: number
  /**
   * Расположение от верха игрового окна.
   * @type {number}
   */
  top: number
  /**
   * Расположение от левого края игрового окна.
   * @type {number}
   */
  left: number
  /**
   * Плывет ли рыба вправо.
   * @type {boolean}
   */
  goesRight: boolean
  /**
   * Значение от 0 до 1. Указывает насколько смещена вправо голова рыбы относительно тела при движении направо.
   * @type {number}
   */
  headXWhenGoesRightRel: number
  /**
   * Значение от 0 до 1. Указывает насколько смещена вправо голова рыбы относительно тела при движении налево.
   * @type {number}
   */
  headXWhenGoesLeftRel: number
  /**
   * Значение от 0 до 1. Указывает насколько смещен вправо центр головы рыбы по Y относительно длины тела.
   * @type {number}
   */
  headYRel: number
  /**
   * Значение от 0 до 1. Указывает радиус атакуемой части тела относительно высоты рыбы.
   * @type {number}
   */
  headRRel: number

  bodyXRel: number

  bodyYRel: number

  bodyRRel: number


  /**
   * Расположение центра головы от левого края, когда плывет вправо.
   * @type {number}
   */
  headXWhenGoesRight: number
  /**
   * Расположение центра головы от левого края, когда плывет влево.
   * @type {number}
   */
  headXWhenGoesLeft: number
  /**
   * Расположение центра головы от верха.
   * @type {number}
   */
  headY: number
  /**
   * Радиус головы.
   * @type {number}
   */
  headR: number
  /**
   * Расположение центра тела от левого края.
   * @type {number}
   */
  bodyX: number
  /**
   * Расположение центра тела от верха.
   * @type {number}
   */
  bodyY: number
  /**
   * Радиус части тела, которую можно атаковать.
   * @type {number}
   */
  bodyR: number
}
