// 轮播图
{
    let carousel    = document.querySelector(".left.banner");
    let images      = document.querySelectorAll(".img_box>li");    // 获取轮播图片
    let dotBox      = document.querySelectorAll(".dot_box>li");    // 获取播放点
    let arrow       = document.querySelectorAll(".arrow>li");    // 获取播放点
    let current     = 0;    // 当前播放位置
    let Timer       = null; // 定时器

    // 自动轮播
    function autoplay() {
        Timer = setInterval(() => {
            SwitchImage(current);
            // 判断是否轮播到最后一张
            if(current == images.length-1){current=0}else{current++;};
        }, 1500);
    }

    // 图片切换
    function SwitchImage(current){
        // 删除兄弟节点 class
        images.forEach(item=>{
            item.classList.remove("current");
        });
        dotBox.forEach(item=>{
            item.classList.remove("current");
        });
        // 添加当前类
        images[current].classList.add("current");
        dotBox[current].classList.add("current");
    };
    autoplay();
    // 鼠标移入 移出事件
    carousel.addEventListener("mouseover",()=>{
        clearInterval(Timer);
    });
    carousel.addEventListener("mouseout",()=>{
        autoplay();
    });

    // 左右按钮点击事件
    arrow[0].addEventListener("click",()=>{
        if (current == 0) {current = images.length - 1;}else{current--;};
        SwitchImage(current);
    })
    arrow[1].addEventListener("click",()=>{
        if (current == images.length - 1) {current = 0;}else{current++;};
        SwitchImage(current);
    })
}

// 曲线图
{
    let graph = echarts.init(document.getElementById('graph'));
    // 指定图表的配置项和数据
    let option = {
        title: {
            text: '曲线数据图展示',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        color: "#337af1",
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    graph.setOption(option);
}

// 饼状图
{
    let pieChart = echarts.init(document.getElementById('pieChart'));
    let option = {
        title: {
            text: '饼状图数据展示',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    pieChart.setOption(option);
}

// 柱状图
{
    let barGraph = echarts.init(document.getElementById('barGraph'));
    let option = {
        title: {
            text: '柱状图数据展示',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };

    barGraph.setOption(option);
}