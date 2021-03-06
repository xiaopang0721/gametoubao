/**
* name 
*/
module gametoubao.page {
	export class ToubaoPageDef extends game.gui.page.PageDef {
		static GAME_NAME: string;
		//骰宝界面
		static PAGE_TOUBAO: string = "1";
		//骰宝地图UI
		static PAGE_TOUBAO_MAP: string = "2";
		//骰宝开始下注界面
		static PAGE_TOUBAO_BEGIN: string = "3";
		//骰宝游戏规则界面
		static PAGE_TOUBAO_RULE: string = "101";
		//骰宝停止下注界面
		static PAGE_TOUBAO_END: string = "11";
		//骰宝走势图界面
		static PAGE_TOUBAO_ROAD: string = "12";

		static myinit(str: string) {
			super.myinit(str);
			ToubaoClip.init();
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO] = ToubaoPage;
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO_MAP] = ToubaoMapPage;
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO_BEGIN] = ToubaoBeginPage;
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO_RULE] = ToubaoRulePage;
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO_END] = ToubaoEndPage;
			PageDef._pageClassMap[ToubaoPageDef.PAGE_TOUBAO_ROAD] = ToubaoRoadPage;

			this["__needLoadAsset"] = [
                Path_game_toubao.atlas_game_ui + "toubao.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "qifu.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "hud.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "touxiang.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "logo.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "chongzhi.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "nyl.atlas",
				PathGameTongyong.atlas_game_ui_tongyong + "yq.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "dating.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general/effect/shaizi.atlas",
                PathGameTongyong.atlas_game_ui_tongyong + "general/effect/hulu1.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general + "anniu.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksyx.atlas",
                PathGameTongyong.atlas_game_ui_tongyong_general_effect + "ksxz.atlas",
				PathGameTongyong.ui_tongyong_sk + "HeGuan.png",

				Path.custom_atlas_scene + 'chip.atlas',
				Path.map + 'pz_toubao.png',
				Path.map_far + 'bg_toubao.jpg'
			]

			if (WebConfig.needMusicPreload) {
				this["__needLoadAsset"] = this["__needLoadAsset"].concat([
					Path_game_toubao.music_toubao + "toubao_bgm.mp3",
					Path_game_toubao.music_toubao + "chouma.mp3",
					Path_game_toubao.music_toubao + "da.mp3",
					Path_game_toubao.music_toubao + "dan1.mp3",
					Path_game_toubao.music_toubao + "dan2.mp3",
					Path_game_toubao.music_toubao + "dan3.mp3",
					Path_game_toubao.music_toubao + "dan4.mp3",
					Path_game_toubao.music_toubao + "dan5.mp3",
					Path_game_toubao.music_toubao + "dan6.mp3",
					Path_game_toubao.music_toubao + "dian4.mp3",
					Path_game_toubao.music_toubao + "dian5.mp3",
					Path_game_toubao.music_toubao + "dian6.mp3",
					Path_game_toubao.music_toubao + "dian7.mp3",
					Path_game_toubao.music_toubao + "dian8.mp3",
					Path_game_toubao.music_toubao + "dian9.mp3",
					Path_game_toubao.music_toubao + "dian10.mp3",
					Path_game_toubao.music_toubao + "dian11.mp3",
					Path_game_toubao.music_toubao + "dian12.mp3",
					Path_game_toubao.music_toubao + "dian13.mp3",
					Path_game_toubao.music_toubao + "dian14.mp3",
					Path_game_toubao.music_toubao + "dian15.mp3",
					Path_game_toubao.music_toubao + "dian16.mp3",
					Path_game_toubao.music_toubao + "dian17.mp3",
					Path_game_toubao.music_toubao + "dingding_end.mp3",
					Path_game_toubao.music_toubao + "dingding_start.mp3",
					Path_game_toubao.music_toubao + "piaoqian.mp3",
					Path_game_toubao.music_toubao + "shouqian.mp3",
					Path_game_toubao.music_toubao + "weitou.mp3",
					Path_game_toubao.music_toubao + "chouma.mp3",
					Path_game_toubao.music_toubao + "xiao.mp3",
					Path_game_toubao.music_toubao + "xiazhu_end.mp3",
					Path_game_toubao.music_toubao + "xiazhu_start.mp3",
					Path_game_toubao.music_toubao + "yaotouzi.mp3",
					Path_game_toubao.music_toubao + "zjtongchi.mp3",
				])
			}
		}
	}
}