
Component({
    properties: {
        groupList: {
            type: Array
        }
    },

    data: {
        popObj: null,
        choosePopItem: 0,
        show: true,
        date:'',
        defaultDate:[new Date().getTime() - 60 * 60 * 24 * 30 * 5 ,new Date().getTime()],
        // 注意的是min-date和max-date的区间不宜过大，否则会造成严重的性能问题。
        // 最好间隔5个月
    minDate: new Date().getTime() - 1000  * 60 * 60 * 24 * 30 * 5  ,
    maxDate: new Date().getTime(),
    },

    methods: {
        // 组件头部点击执行，根据点击对象type值执行不同
        handleHeaderItemClick(e) {
            wx.showLoading()
            let that = this;
            // 点击下标，html中通过data传递
            let index = e.currentTarget.dataset.index;

            // 点击对象
            let itemObj = this.data.groupList[index];

            /**
             * @params {String} type radio：单选；checkDate：选择日期
             */
            switch(itemObj.type) {
                case 'radio':
                    that.setData({
                        popObj: itemObj,
                        chooseIndex: index,
                        show:false
                    },()=>{
                        wx.hideLoading()
                    })
                    // 下拉选择单选
                    break;
                case 'checkDate':
                    // 选择日期
                    that.setData({
                        popObj: itemObj,
                        chooseIndex: index,
                        show:true
                    }, () => {
                        wx.hideLoading()
                        // if(!itemObj.value) {
                        //     that.selectComponent('#Calendar').today()
                        // }
                    })
                    break;
            }
        },

        // 日历弹出选择
       

        // 选择弹出窗口的某一下
        choosePopItem(e) {
            let that = this;
            that.data.popObj.chooseIndex = e.currentTarget.dataset.index;
            that.data.groupList[that.data.chooseIndex] = that.data.popObj;

            that.setData({
                popObj: null,
                groupList: that.data.groupList
            }, () => {
                
                that.triggerEvent('change', {
                    groupList: that.data.groupList
                })
                
            })
        },

      
       

       
        // vant日期选择
          onClose() {
              //取消 默认全部
              const list =   this.data.groupList
            delete list[2]['startFormmter']
            delete list[2]['endFormmter']
            list[2]['start'] =''
            list[2]['end'] =''
            list[2]['value']='投诉日期'
            this.setData({
                show:false,date:'',
                groupList: list ,
                popObj:null
            },()=>{
                this.triggerEvent('change', {
                    groupList: this.data.groupList
                })   
            })
           
          },
          formatDate(date) {
            date = new Date(date);
            // 
            // console.log(date.getTime())
            return `${date.getMonth() + 1}/${date.getDate()}`;
          },
          forSheetNoDate(date){
                // 月份补足 不到10 为 0
                date = new Date(date);
                let newMonth = Number(date.getMonth() + 1)  <  10 ?'0' +  (date.getMonth() + 1) :date.getMonth() + 1 ;
                let newDay = Number(date.getDate()) < 10 ? '0' + date.getDate():date.getDate()
                return `${date.getFullYear()}-${newMonth}-${newDay}`;
            
          },
          onConfirm(event) {
            const [start, end] = event.detail;
        this.data.groupList[2] =  Object.assign(this.data.popObj,{
            value: `${this.formatDate(start)} - ${this.formatDate(end)}`,
            start:new Date(start).getTime(),
            startFormmter:this.forSheetNoDate(start),
            endFormmter:this.forSheetNoDate(end),
            end:new Date(end).getTime()
        })
            this.setData({
              show: false,
              popObj: null,
              groupList: this.data.groupList,
              date: `${this.formatDate(start)} - ${this.formatDate(end)}`,
            },()=>{
                // do something
                this.triggerEvent('change', {
                    groupList: this.data.groupList
                })
            });
          },
    }
})
