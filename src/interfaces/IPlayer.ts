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
   * Клавиша управления, использованная игроком.
   * @type {number}
   */
  key: number
}
