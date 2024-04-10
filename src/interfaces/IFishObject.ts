export interface IFishObject {
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
}
