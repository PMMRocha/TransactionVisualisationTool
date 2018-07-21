import { State, Action, StateContext } from "@ngxs/store";
import { NavigateTo, NavigateToChartViewer } from "../actions/router.actions";
import { Router } from "@angular/router";

export interface RouterStateModel {
  url: string;
}

@State<RouterStateModel>({
  name: 'Router',
  defaults: {
    url: ''
  }
})
export class RouterState {
  constructor(private router: Router) {}
  @Action(NavigateTo)
  navigateTo(
    { patchState }: StateContext<RouterStateModel>,
    { payload }: NavigateTo
  ): void {
    this.router.navigate([payload]);
    patchState({ url: payload });
  }

  @Action(NavigateToChartViewer)
  navigateToChartViewer(
    { patchState }: StateContext<RouterStateModel>,
    { payload }: NavigateToChartViewer
  ): void {
    const url: string[] = ['chart', payload.year, payload.month, payload.day];
    patchState({ url: url.join('/') });
    this.router.navigate(url);
  }
}
