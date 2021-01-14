Component({
    properties: {
        item: Object,
        bgc: String,
        showWorkMessage: Boolean
    },
    methods: {
        getNewUrl(){
            wx.redirectTo({url:'/pages/detail/detail'})
        }
    },
    lifetimes: {
        attached() {
            let item = this.data.item;
            switch(item.state * 1){
                case 1:
                    item['workStatusClass'] = 'work-wait';
                    break;
                case 12:
                    item['workStatusClass'] = 'work-back';
                    break;
                case 3:
                    item['workStatusClass'] = 'work-ing';
                    break;
                case 4:
                    item['workStatusClass'] = 'work-wait';
                    break;
            };
            this.setData({
                item
            })
        }
    }
})
