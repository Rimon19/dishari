import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component, OnInit,HostBinding  } from '@angular/core';
import 'jquery';
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
 
})
export class AppComponent implements OnInit {
  
  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      if (!user) return; 
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return; 

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });
    
  }
  ngOnInit() {
    // $.getScript('assets/js/jquery-3.2.1.min.js');
    // $.getScript('assets/js/popper.min.js');
    // $.getScript('assets/js/bootstrap.min.js');
    // $.getScript('assets/vendors/revolution/js/jquery.themepunch.tools.min.js');
    // $.getScript('assets/vendors/revolution/js/jquery.themepunch.revolution.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.actions.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.video.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.slideanims.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.layeranimation.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.navigation.min.js');
    // $.getScript('assets/vendors/revolution/js/extensions/revolution.extension.slideanims.min.js');
    // $.getScript('assets/vendors/counterup/jquery.waypoints.min.js');
    // $.getScript('assets/vendors/counterup/jquery.counterup.min.js');
    // $.getScript('assets/vendors/owl-carousel/owl.carousel.min.js');
    // $.getScript('assets/vendors/bootstrap-selector/js/bootstrap-select.min.js');
    // $.getScript('assets/vendors/image-dropdown/jquery.dd.min.js');
    // $.getScript('assets/js/smoothscroll.js');
    // $.getScript('assets/vendors/isotope/imagesloaded.pkgd.min.js');
    // $.getScript('assets/vendors/isotope/isotope.pkgd.min.js');
    // $.getScript('assets/vendors/magnify-popup/jquery.magnific-popup.min.js');
    // $.getScript('assets/vendors/vertical-slider/js/jQuery.verticalCarousel.js');
    // $.getScript('assets/vendors/jquery-ui/jquery-ui.js');
    // $.getScript('assets/js/theme.js');
}
}
