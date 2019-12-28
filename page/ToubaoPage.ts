/**
* 牛牛
*/
module gametoubao.page {
	export class ToubaoPage extends game.gui.base.Page {
		private _viewUI: ui.ajqp.game_ui.toubao.TouBao_HUDUI;
		private _player: any;
		private _playerInfo: any;
		private _listArr: any;
		private _listState: any;
		private _xianhongTemp: number[] = [5000, 8000, 25000, 50000];
		private _xianhongClipList: ToubaoClip[] = [];

		constructor(v: Game, onOpenFunc?: Function, onCloseFunc?: Function) {
			super(v, onOpenFunc, onCloseFunc);
			this._asset = [
				Path_game_toubao.atlas_game_ui + "toubao.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general + "anniu.atlas",
				PathGameTongyong.atlas_game_ui_tongyong_general_effect + "anniug.atlas",
			];
			this._isNeedDuang = false;
		}

		// 页面初始化函数
		protected init(): void {
			this._viewUI = this.createView('game_ui.toubao.TouBao_HUDUI', ["game_ui.tongyong.HudUI"]);
			this.addChild(this._viewUI);
		}

		// 页面打开时执行函数
		protected onOpen(): void {
			super.onOpen();
			// this._viewUI.btn_xinshou.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			// this._viewUI.btn_chuji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			// this._viewUI.btn_zhongji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			// this._viewUI.btn_gaoji.on(LEvent.CLICK, this, this.onBtnClickWithTween);
			(this._viewUI.view as TongyongHudPage).onOpen(this._game, ToubaoPageDef.GAME_NAME);
			for (let index = 0; index < this._viewUI.box_right.numChildren; index++) {
				this._viewUI.box_right._childs[index].visible = true;
				Laya.Tween.from(this._viewUI.box_right._childs[index], {
					x: 1280
				}, 200 + index * 100, Laya.Ease.linearNone, Handler.create(this, () => {
					this._viewUI.box_right._childs[index].on(LEvent.CLICK, this, this.onBtnClickWithTween);
				}));
			}
			this._game.playMusic(Path_game_toubao.music_toubao + "toubao_bgm.mp3");

			for (let index = 0; index < 4; index++) {
				if (!this._xianhongClipList[index]) {
					this._xianhongClipList[index] = new ToubaoClip(ToubaoClip.WHITE_FONT);
					this._xianhongClipList[index].centerX = this._viewUI["txt_xianhong" + index].centerX;
					this._xianhongClipList[index].centerY = this._viewUI["txt_xianhong" + index].centerY;
					this._viewUI["txt_xianhong" + index].parent && this._viewUI["txt_xianhong" + index].parent.addChild(this._xianhongClipList[index]);
					this._viewUI["txt_xianhong" + index].removeSelf();
					this._xianhongClipList[index].setText(this._xianhongTemp[index], true, false, PathGameTongyong.ui_tongyong_hud + "tu_xh.png");
				}
			}
		}


		protected onBtnTweenEnd(e: any, target: any): void {
			this._player = this._game.sceneObjectMgr.mainPlayer;
			if (!this._player) return;
			this._playerInfo = this._player.playerInfo;
			switch (target) {
				case this._viewUI.btn_xinshou:
					this._game.sceneObjectMgr.intoStory(ToubaoPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_TOUBAO_1.toString(), true);
					break;
				case this._viewUI.btn_chuji:
					this._game.sceneObjectMgr.intoStory(ToubaoPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_TOUBAO_2.toString(), true);
					break;
				case this._viewUI.btn_zhongji:
					this._game.sceneObjectMgr.intoStory(ToubaoPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_TOUBAO_3.toString(), true);
					break;
				case this._viewUI.btn_gaoji:
					this._game.sceneObjectMgr.intoStory(ToubaoPageDef.GAME_NAME, Web_operation_fields.GAME_ROOM_CONFIG_TOUBAO_4.toString(), true);
					break;
				default:
					break;
			}
		}

		public close(): void {
			this._player = null;
			if (this._viewUI) {
				this._viewUI.btn_xinshou.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_chuji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_zhongji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._viewUI.btn_gaoji.off(LEvent.CLICK, this, this.onBtnClickWithTween);
				this._game.stopMusic();
				Laya.Tween.clearAll(this);
			}

			super.close();
		}
	}
}