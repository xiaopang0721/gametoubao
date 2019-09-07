/**
* name 
*/
module gametoubao.manager {
	export class ToubaoMgr extends gamecomponent.managers.BaseMgr{
		static readonly MAPINFO_OFFLINE: string = "ToubaoMgr.MAPINFO_OFFLINE";//假精灵

		private _offlineUnit: UnitOffline;//假精灵信息
		private _isCancel: boolean = false;
		private _isReConnect: boolean = true;

		constructor(game: Game) {
			super(game)
		}

		get offlineUnit() {
			return this._offlineUnit;
		}

		set offlineUnit(v) {
			this._offlineUnit = v;
			this.event(ToubaoMgr.MAPINFO_OFFLINE)
		}

		get isReConnect() {
			return this._isReConnect;
		}

		set isReConnect(v) {
			this._isReConnect = v;
		}
	}
}