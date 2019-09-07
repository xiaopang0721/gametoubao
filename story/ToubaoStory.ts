/**
* name 牛牛剧情
*/
module gametoubao.story {
	export class ToubaoStory extends gamecomponent.story.StoryBaiRenBase {
		static readonly PLAY_STATUS_NONE = 0 // 准备阶段
		static readonly PLAY_STATUS_GAMESTART = 1 // 游戏开始
		static readonly PLAY_STATUS_PUSH_CARD = 2 // 发牌阶段
		static readonly PLAY_STATUS_BET = 3// 下注阶段
		static readonly PLAY_STATUS_STOP_BET = 4// 停止下注阶段
		static readonly PLAY_STATUS_SHOW_CARD = 5 // 开牌阶段
		static readonly PLAY_STATUS_SETTLE = 6 // 结算阶段
		static readonly PLAY_STATUS_SHOW_INFO = 7 // 显示结算信息阶段
		static readonly PLAY_STATUS_RELAX = 8 // 休息阶段

		/**房间场次信息*/
		static readonly ROOM_INFO_LEVEL: string = "ROOM_INFO_LEVEL";

		private _toubaoMgr: ToubaoMgr;
		private _winnerIndex: number;
		private _curStatus: number;
		private _niuMapInfo: ToubaoMapInfo;
		private _openCards: Array<any> = [];
		private _isShow: boolean;

		constructor(v: Game, mapid: string, maplv: number) {
			super(v, mapid, maplv);
			this.init();
		}

		get toubaoMgr() {
			return this._toubaoMgr;
		}

		init() {
			if (!this._toubaoMgr) {
				this._toubaoMgr = new ToubaoMgr(this._game);
			}
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.on(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			this._game.sceneObjectMgr.on(ToubaoMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
			this._game.sceneObjectMgr.on(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			this.onIntoNewMap();
		}

		private onIntoNewMap(info?: MapAssetInfo): void {
			if (!info) return;
			this.onMapInfoChange();
			this._game.uiRoot.closeAll();
			this._game.uiRoot.HUD.open(ToubaoPageDef.PAGE_TOUBAO_MAP);
		}

		private onMapInfoChange(): void {
			let mapinfo = this._game.sceneObjectMgr.mapInfo;
			this._niuMapInfo = mapinfo as ToubaoMapInfo;
			if (mapinfo) {

				this.onUpdateState();
				this.onUpdateBattle();
			}
		}

		private onUpdateState(): void {
			if (!this._niuMapInfo) return;
			let mapStatus = this._niuMapInfo.GetMapState();
			if (this._curStatus == mapStatus) return;
			this._curStatus = mapStatus;
			switch (this._curStatus) {
				case ToubaoStory.PLAY_STATUS_NONE:// 准备阶段      
					this.serverClose();
					break;
				case ToubaoStory.PLAY_STATUS_GAMESTART:// 游戏开始
					break;
				case ToubaoStory.PLAY_STATUS_PUSH_CARD:// 发牌阶段
					break;
				case ToubaoStory.PLAY_STATUS_BET:// 下注阶段
					break;
				case ToubaoStory.PLAY_STATUS_STOP_BET:// 停止下注阶段
					break;
				case ToubaoStory.PLAY_STATUS_SHOW_CARD:// 开牌阶段
					break;
				case ToubaoStory.PLAY_STATUS_SETTLE:// 结算阶段
					break;
				case ToubaoStory.PLAY_STATUS_SHOW_INFO:// 显示结算信息阶段
					break;
				case ToubaoStory.PLAY_STATUS_RELAX:// 休息阶段
					break;
			}
		}

		//战斗结构体 出牌
		private _index: number = 0;
		private onUpdateBattle(): void {
			if (!this._niuMapInfo) return;
			let battleInfoMgr = this._niuMapInfo.battleInfoMgr;
			for (let i: number = 0; i < battleInfoMgr.info.length; i++) {
				let info = battleInfoMgr.info[i];

			}
		}

		createofflineUnit() {
			//创建假的地图和精灵
			let unitOffline = new UnitOffline(this._game.sceneObjectMgr);
			if (this._game.sceneObjectMgr.mainPlayer) {
				unitOffline.SetStr(UnitField.UNIT_STR_NAME, this._game.sceneObjectMgr.mainPlayer.playerInfo.nickname);
				unitOffline.SetDouble(UnitField.UNIT_INT_MONEY, this._game.sceneObjectMgr.mainPlayer.playerInfo.money);
				unitOffline.SetUInt32(UnitField.UNIT_INT_QI_FU_END_TIME, this._game.sceneObjectMgr.mainPlayer.playerInfo.qifu_endtime);
			}
			unitOffline.SetUInt16(UnitField.UNIT_INT_UINT16, 0, 1);
		}

		enterMap() {
			//各种判断
			this._game.network.call_match_game(this._mapid, this.maplv);
			return true;
		}

		leavelMap() {
			//各种判断
			this._game.network.call_leave_game();
			return true;
		}

		clear() {
			this._game.sceneObjectMgr.off(ToubaoMapInfo.EVENT_BATTLE_CHECK, this, this.onUpdateBattle);
			this._game.sceneObjectMgr.off(MapInfo.EVENT_STATUS_CHECK, this, this.onUpdateState);
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_LOAD_MAP, this, this.onIntoNewMap);
			this._game.sceneObjectMgr.off(SceneObjectMgr.EVENT_MAPINFO_CHANGE, this, this.onMapInfoChange);
			if (this._toubaoMgr) {
				this._toubaoMgr.clear();
				this._toubaoMgr = null;
			}
		}

		update(diff: number) {

		}
	}
}