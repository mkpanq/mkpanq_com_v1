const Background = () => {
  VANTA.FOG({
    el: "#index-bg",
    highlightColor: 0xf5d7a6,
    midtoneColor: 0xf5d7a6,
    lowlightColor: 0xf5d7a6,
    baseColor: 0xfffdfa,
    blurFactor: 0.8,
    speed: 2,
    zoom: 0.7,
  });

  return <div id="index-bg">background !</div>;
};

export default Background;
