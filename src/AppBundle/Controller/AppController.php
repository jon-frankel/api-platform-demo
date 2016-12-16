<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/")
 */
class AppController extends Controller
{
    /**
     * @Route("/", name="index")
     *
     * @Template("AppBundle::index.html.twig")
     *
     * @return array
     */
    public function indexAction()
    {
        return [];
    }
}
