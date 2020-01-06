/**
* name 
*/
module gametoubao.page {
	export class ToubaoRoadPage extends game.gui.base.Page {
		private _viewUI: ui.ajqp.game_ui.toubao.TouBao_ZouShiTuUI;
		private _isShenQing: boolean = false;
		private _mapinfo: ToubaoMapInfo;

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._isNeedBlack = true;
			this._isClickBlack = true;
			this._isNeedDuang = false;
			this._asset = [
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				Path_game_toubao.atlas_game_ui + "toubao.atlas",
			];
		}

		protected init(): void {
			this._viewUI = this.createView('game_ui.toubao.TouBao_ZouShiTuUI');
			this.addChild(this._viewUI);

		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			this._viewUI.list_record.itemRender = this.createChildren("game_ui.toubao.component.RecordRenderUI", MapRecordRender);
			this._viewUI.list_record.renderHandler = new Handler(this, this.renderHandler);
			this._viewUI.list_result.itemRender = this.createChildren("game_ui.toubao.component.ZouShiDaXiaoUI", ResultRender);
			this._viewUI.list_result.renderHandler = new Handler(this, this.renderHandler1);

			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
			this._game.sceneObjectMgr.on(ToubaoMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
			this.onUpdateMapInfo();
			this.onUpdateRecord();

		}

		private onUpdateMapInfo() {
			this._mapinfo = this._game.sceneObjectMgr.mapInfo as ToubaoMapInfo;
			if (this._mapinfo) {
				this._mapinfo.on(ToubaoMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
				this.onUpdateRecord();
			}
		}

		private renderHandler(cell: MapRecordRender, index: number) {
			if (cell) {
				cell.setData(this._game, cell.dataSource);
			}
		}

		private renderHandler1(cell: ResultRender, index: number) {
			if (cell) {
				cell.setData(this._game, cell.dataSource);
			}
		}

		//最近游戏记录
		private onUpdateRecord(): void {
			if (!this._mapinfo) return;
			let recordArr = [];
			if (this._mapinfo.GetGameRecord() != "") {
				let data = JSON.parse(this._mapinfo.GetGameRecord());
				if (data.length > 10) {
					for (let i = 0; i < 10; i++) {
						recordArr[9 - i] = data[data.length - 1 - i];
					}
				} else {
					recordArr = data;
				}
			}
			this._viewUI.list_record.dataSource = recordArr; ``

			let gameNum = 10;//recordArr.length
			this._viewUI.txt_title.text = StringU.substitute("近{0}局胜负", gameNum);
			//计算最近10场胜负
			let resultArr = [];
			let xiaoWin = 0;
			let daWin = 0;
			for (let i = 0; i < recordArr.length; i++) {
				let arr = recordArr[i].split(",");
				let diceA = parseInt(arr[0]);
				let diceB = parseInt(arr[1]);
				let diceC = parseInt(arr[2]);
				let count = diceA + diceB + diceC;
				if (diceA == diceB && diceA == diceC && diceC == diceB) {
					resultArr.push(3);
				} else if (count >= 4 && count <= 10) {
					resultArr.push(1);
				} else if (count >= 11 && count <= 17) {
					resultArr.push(2);
				}
			}
			for (let i = 0; i < resultArr.length; i++) {
				if (resultArr[i] == 1)
					xiaoWin++;
				if (resultArr[i] == 2)
					daWin++;
			}
			this._viewUI.txt_xiao.text = Math.round(xiaoWin * 100 / gameNum) + "%";
			this._viewUI.txt_da.text = Math.round(daWin * 100 / gameNum) + "%";
			this._viewUI.list_result.dataSource = resultArr;
		}

		public close(): void {
			if (this._viewUI) {
				this._viewUI.list_record.hScrollBarSkin = null;
			}
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onUpdateMapInfo);
			this._game.sceneObjectMgr.off(ToubaoMapInfo.EVENT_GAME_RECORD, this, this.onUpdateRecord);//游戏记录更新
			super.close();
		}
	}

	class MapRecordRender extends ui.ajqp.game_ui.toubao.component.RecordRenderUI {
		private _game: Game;
		private _data: any;
		constructor() {
			super();
		}
		setData(game: Game, data: any) {
			this._game = game;
			this._data = data;
			if (!this._data) {
				this.visible = false;
				return;
			}
			this.visible = true;
			let arr = this._data.split(",")
			this.dice0.skin = StringU.substitute(Path_game_toubao.ui_toubao + "tu_sz{0}.png", arr[0]);
			this.dice1.skin = StringU.substitute(Path_game_toubao.ui_toubao + "tu_sz{0}.png", arr[1]);
			this.dice2.skin = StringU.substitute(Path_game_toubao.ui_toubao + "tu_sz{0}.png", arr[2]);
			let count = 0;
			for (let i = 0; i < arr.length; i++) {
				count += parseInt(arr[i])
			}
			this.txt_num.text = count.toString();
		}
		destroy() {
			super.destroy();
		}
	}

	class ResultRender extends ui.ajqp.game_ui.toubao.component.ZouShiDaXiaoUI {
		private _game: Game;
		private _data: any;
		constructor() {
			super();
		}
		setData(game: Game, data: any) {
			this._game = game;
			this._data = data;
			if (!this._data) {
				this.visible = false;
				return;
			}
			this.visible = true;
			let zi = this._data == 3 ? "围" : this._data == 2 ? "大" : "小";
			this.txt_zi.text = zi;
		}
		destroy() {
			super.destroy();
		}
	}
}