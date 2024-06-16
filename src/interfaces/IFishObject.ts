export interface IFishObject {
  /**
   * Название рыбы.
   * @type {string}
   */
  name: string
  /**
   * Высота рыбы.
   * @type {number}
   */
  height: number
  /**
   * Ширина рыбы.
   * @type {number}
   */
  width: number
  /**
   * Путь к изображению.
   * @type {string}
   */
  imagePath: string
  /**
   * Направление движения.
   * @type {boolean}
   */
  goesRight: boolean
  /**
   * Скорость рыбы (смещение в px каждый кадр).
   * @type {number}
   */
  speed: number
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
   * Расположения центра головы от левого края.
   * @type {number}
   */
  headX: number
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
