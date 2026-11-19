import type { NearbySlug } from './nearby';

/** Site-specific visitor experiences, separate from the short highlights in the introduction. */
export const nearbyExperience: Record<'zh' | 'en' | 'es', Record<NearbySlug, string>> = {
  zh: {
    'templo-expiatorio': '先站在广场边缘，观察教堂垂直向上的轮廓，再沿侧面慢慢走近彩窗与扶壁。广场与教堂虽然紧邻，却分别承担城市公共生活与宗教礼仪的角色；在傍晚能尤其明显地看到两种活动如何共处。',
    'musa-museo-de-las-artes': '先从 Juárez 大道上欣赏大学建筑外观，再把重心转向馆内当期展览。若 Paraninfo 当天开放，不要错过 José Clemente Orozco 的壁画；它们与现代展览形成观察墨西哥艺术传统的两条线索。',
    'parque-de-la-revolucion': '公园并非一个完全隔离于街道的绿色院落。穿过不同园区时，可以比较树荫、人行步道、总统纪念雕像与交通动线之间的关系，也能感受 20 世纪城市公共空间如何持续被居民使用。',
    'ex-convento-del-carmen': '在旧修道院的院落里停留片刻，比较厚重的历史墙体与临时展陈的轻巧布局。这里的价值既来自加尔默罗修会留下的建筑痕迹，也来自今天的展览、演出与书籍活动，不必只把它当作一栋漂亮的老房子。',
    'museo-de-la-ciudad': '建议先看底层的城市历史陈列，把征服时期、城市规划和民俗生活串成一条脉络，再走进临展空间。离馆后再回望市中心的街道尺度与旧建筑，展厅中的历史内容会更容易和真实城市对应。',
    'casa-iteso-clavigero': '这栋房子的体验不只是寻找巴拉甘的名字，而是观察光线和花园如何参与室内空间的组织。试着从不同门洞向外看，比较阴影、墙面材质和绿植形成的层次，再结合当天展览理解住宅的文化再利用。',
    'avenida-chapultepec': '把大道当作一段可以随时停下的城市散步，而不是必须逐项打卡的景区。从林荫中央带到两侧商铺，留意不同时段的行人、街头艺术及建筑立面；活动与市集是否出现应以当天实际情况为准。',
    'teatro-degollado': '从广场中央看剧院的整体对称，再靠近山墙寻找雕饰与古典柱式。若恰逢演出，剧院在音乐、舞蹈和观众活动中呈现的文化功能与白天静态观赏很不同，值得提前查看节目安排。',
    'catedral-metropolitana': '先从宽阔的广场寻找双塔的完整轮廓，再从不同街角观察其外形变化。建筑本身展示了多个历史时期的风格叠加，而周围广场让它兼具宗教空间和城市地标的双重意义。',
    'rotonda-jaliscienses-ilustres': '绕行柱廊时，试着把雕像姓名与城市历史联系起来，并留意石环上的纪念文字。这里紧挨主教座堂，能够在很短的距离内比较宗教建筑与公民纪念空间的表达方式。',
  },
  en: {
    'templo-expiatorio': 'Begin at the edge of the square to appreciate the church’s vertical silhouette, then walk toward the stained glass and buttresses along the side. The plaza and church have distinct civic and religious roles, and their coexistence is especially visible in the evening.',
    'musa-museo-de-las-artes': 'Start with the university façade on Avenida Juárez, then let the current exhibitions shape the indoor visit. If the Paraninfo is open, the murals by José Clemente Orozco offer a compelling counterpoint to contemporary displays and reveal different chapters of Mexican art.',
    'parque-de-la-revolucion': 'This is not an enclosed garden separated from city life. Moving between the two sectors reveals how trees, walking paths, presidential monuments and busy intersections shape a twentieth-century civic space still used by residents today.',
    'ex-convento-del-carmen': 'Pause in the courtyard to compare the weight of old masonry with temporary art installations. The site matters both for the surviving Carmelite architecture and for its present-day exhibitions, concerts and book activities; it is much more than an attractive old façade.',
    'museo-de-la-ciudad': 'Follow the ground-floor history displays to connect conquest-era events, city planning and everyday customs, then explore any changing galleries. When you return to the surrounding streets, the museum’s timeline provides useful context for the scale and layout of downtown Guadalajara.',
    'casa-iteso-clavigero': 'Look beyond the famous architect’s name and study how natural light and the garden organize daily space. Compare views through doorways, the changing shadows on textured walls and the way an old residence now hosts contemporary cultural programming.',
    'avenida-chapultepec': 'Treat the avenue as a flexible neighborhood walk rather than a fixed list of attractions. Notice how the planted median, shopfronts, public art and pedestrians change the street’s character throughout the day; markets and special events depend on the actual calendar.',
    'teatro-degollado': 'Stand across the plaza to appreciate the symmetry, then move closer to the pediment and classical columns. A scheduled music or dance performance adds a living dimension to the architecture that is very different from an exterior sightseeing stop.',
    'catedral-metropolitana': 'Find a wide plaza view that includes both towers, then move around the complex to see how its outline changes. The architecture records several historical periods, while the surrounding public squares show why the cathedral is also an organizing landmark of the city.',
    'rotonda-jaliscienses-ilustres': 'Walk around the colonnade and connect the names on the statues with the history of Jalisco. Because the Rotonda is beside the cathedral, one short stop reveals the different visual languages of civic remembrance and religious architecture.',
  },
  es: {
    'templo-expiatorio': 'Comienza en el borde de la plaza para apreciar la verticalidad del templo y después acércate a los vitrales y contrafuertes laterales. La plaza y el edificio tienen funciones cívicas y religiosas distintas, cuya convivencia se nota especialmente al atardecer.',
    'musa-museo-de-las-artes': 'Observa primero la fachada universitaria desde Juárez y después dedica tiempo a las exposiciones vigentes. Si está abierto el Paraninfo, los murales de José Clemente Orozco ofrecen un contraste valioso con el arte contemporáneo y conectan distintas etapas del arte mexicano.',
    'parque-de-la-revolucion': 'No es un jardín aislado del tránsito urbano. Recorrer sus dos sectores permite comparar árboles, andadores, monumentos presidenciales y cruces viales, y entender cómo sigue utilizándose un espacio cívico del siglo XX.',
    'ex-convento-del-carmen': 'Detente en los patios y contrasta los muros antiguos con los montajes artísticos temporales. El recinto vale tanto por los vestigios carmelitas como por las exposiciones, conciertos y actividades de libros que le dan nueva vida.',
    'museo-de-la-ciudad': 'Recorre las salas históricas para relacionar la época de la conquista, el urbanismo y las costumbres cotidianas; después visita las muestras temporales. Al salir, la escala de las calles del centro y sus edificios antiguos se comprenden mejor a la luz de lo visto dentro.',
    'casa-iteso-clavigero': 'Más allá del nombre de Barragán, observa cómo la luz y el jardín ordenan la casa. Compara las vistas enmarcadas por las puertas, las sombras sobre texturas y el uso actual de la residencia como lugar de exposiciones y encuentros.',
    'avenida-chapultepec': 'Disfruta la avenida como un paseo flexible de barrio, no como una lista rígida de monumentos. El camellón arbolado, las fachadas, el arte público y los peatones crean escenas distintas según la hora; verifica si hay actividades programadas el día de tu visita.',
    'teatro-degollado': 'Mira primero la simetría del teatro desde la plaza y luego acércate al frontón y las columnas clásicas. Una función de música o danza revela una dimensión viva del edificio muy diferente a contemplar solo su exterior.',
    'catedral-metropolitana': 'Busca un ángulo abierto para ver ambas torres y luego camina alrededor del conjunto para comparar su silueta. La mezcla arquitectónica refleja distintas épocas y las plazas explican su función como referente urbano además de religioso.',
    'rotonda-jaliscienses-ilustres': 'Rodea la columnata y relaciona los nombres de las esculturas con la historia de Jalisco. Su cercanía con la catedral permite comparar, en pocos pasos, los lenguajes visuales de la memoria cívica y la arquitectura religiosa.',
  },
};
