
# NASA_Hackson2019_Galaxies
NASA黑客松台北場 隊名：Galaxies

本專案打造一款冒險遊戲教育使用者認識空汙與紫外線資訊,並鼓勵投入環保議題

本專案底下有三個資料夾分別為
- frontend : 前端，預計作為一web app，運行於行動端的瀏覽器上。(未來可考慮改用React Native)
- backend : 後段，提供各類環境資料與辨識之功能給予前端使用。
- domain : 前端與後端的資料會透過domain定義其資料格式(model)的概念。

#### frontend
前端採用ReactJS，並搭配Google API製作地圖物件

#### backend
後端使用Node.js + express作為伺服器，並以mongoDB作為儲存空間