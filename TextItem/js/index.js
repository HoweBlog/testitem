// 导航栏 点击事件
{
	let navBtn 		= document.querySelectorAll(".navigation-right li>a");		// 获取导航节点
	let navBtnBox 	= document.querySelector(".navigation-right");				// 获取导航节点
	navBtnBox.onclick = function(e){
		navBtn.forEach((item,indx)=>{
			if(item == e.target){
				item.classList.add("current");
			}else{
				item.classList.remove("current");
			};
		});
	};
}

// 轮播图
{	
    let carousel    = document.querySelector(".left.banner");       // 获取轮播图box
    let images      = document.querySelectorAll(".img_box>li");     // 获取轮播图片
    let dotBox      = document.querySelectorAll(".dot_box>li");     // 获取轮播圆点
    let dotBoxAll   = document.querySelector(".dot_box");     		// 获取轮播圆点
    let arrow       = document.querySelectorAll(".arrow>li");       // 获取上下切换按钮
    let current     = 0;    	// 当前播放位置
    let Timer       = null; 	// 定时器

    // 自动轮播
    function autoplay() {
        Timer = setInterval(() => {
            SwitchImage(current);
            // 判断是否轮播到最后一张
            if(current == images.length-1){current=0}else{current++;};
        }, 1500);
    };

    // 图片切换
    function SwitchImage(current){
        // 删除兄弟节点 class
        images.forEach((item,index)=>{
            item.classList.remove("current");
			dotBox[index].classList.remove("current");
        });
        // 添加当前类
        images[current].classList.add("current");
        dotBox[current].classList.add("current");
    };
    // 自动轮播
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
    });
    arrow[1].addEventListener("click",()=>{
        if (current == images.length - 1) {current = 0;}else{current++;};
        SwitchImage(current);
    });
	
	// 小圆点 点击切换
	dotBoxAll.onclick = function(e){
		dotBox.forEach((item,index)=>{
			if(item == e.target) {
				current = index;
				SwitchImage(index);
			};
		});
	};	
}


/** 
 *  Ajax异步请求 - 请求echarts数据
 *  @param { String }	type	请求参数
 */
function ajaxGet(type) { 
    const xhr = new XMLHttpRequest();
    xhr.open('GET',"https://edu.telking.com/api/"+"?type="+type, true);
    xhr.send();
	return xhr;
}

 /** 
 *  处理 Echarts数据
 *  @param { String }       titleText       图表 title
 *  @param { String }       seriesType      数据展示类型 曲线/柱状
 *  @param { DOM 	}    	RenderingNode   渲染节点
 *  @param { Array  }   	xAxisData   	X轴数据
 *  @param { Array  }   	seriesData  	Y轴数据
 */
 function chartData(titleText,seriesType,RenderingNode,xAxisData,seriesData){
    let option =  {
        title: {
            text: titleText,
            left: 'center'
        },
		tooltip: {
		    trigger: 'axis',
		    axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
		    }
		},
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        color: "#337af1",
        yAxis: {
            type: 'value'
        },
        series: [{
            barWidth: '30%',
            data: seriesData,
            type: seriesType,
			smooth: true,
			areaStyle: {}
        }]
    };
    RenderingNode.setOption(option);
 };

// 曲线图
{
	let graph = echarts.init(document.querySelector('#graph'));
	let parameterFailure = ajaxGet("month");
	let receiveData;
	parameterFailure.onreadystatechange = function (){
		if (parameterFailure.readyState == 4 && parameterFailure.status == 200) {
			receiveData = JSON.parse(parameterFailure.responseText);
			chartData("曲线数据图展示","line",graph,receiveData.data.xAxis,receiveData.data.series);
		}
	}
}

// 柱状图
{
	let barGraph = echarts.init(document.querySelector('#barGraph'));
	let parameterFailure = ajaxGet("week");
	let receiveData;
	parameterFailure.onreadystatechange = function (){
		if (parameterFailure.readyState == 4 && parameterFailure.status == 200) {
			receiveData = JSON.parse(parameterFailure.responseText);
			pieChartFn(receiveData.data);	// 调用生成饼状图
			chartData("柱状图数据展示","bar",barGraph,receiveData.data.xAxis,receiveData.data.series);
		}
	}
}

// 饼状图
function pieChartFn(receiveData){
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
	        data: [],
	        emphasis: {
	            itemStyle: {
	                shadowBlur: 10,
	                shadowOffsetX: 0,
	                shadowColor: 'rgba(0, 0, 0, 0.5)'
	            }
	        }
	    }]
	};
	receiveData.series.forEach((item,index)=>{
		option.series[0].data.push({ value:item, name:receiveData.xAxis[index]});			
	})
	pieChart.setOption(option);
};